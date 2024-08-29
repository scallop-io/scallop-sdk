import { QueryClient, QueryClientConfig } from '@tanstack/query-core';
import {
  SuiObjectArg,
  SuiTxBlock,
  normalizeStructTag,
  normalizeSuiAddress,
} from '@scallop-io/sui-kit';
import { SuiKit } from '@scallop-io/sui-kit';
import type {
  SuiObjectResponse,
  SuiObjectDataOptions,
  SuiObjectData,
  GetOwnedObjectsParams,
  DevInspectResults,
  GetDynamicFieldsParams,
  DynamicFieldPage,
  GetDynamicFieldObjectParams,
  GetBalanceParams,
  SuiClient,
} from '@mysten/sui/client';
import { DEFAULT_CACHE_OPTIONS } from 'src/constants/cache';
import { callWithRateLimit, TokenBucket } from 'src/utils';
import {
  DEFAULT_INTERVAL_IN_MS,
  DEFAULT_TOKENS_PER_INTERVAL,
} from 'src/constants/tokenBucket';

type QueryInspectTxnParams = {
  queryTarget: string;
  args: SuiObjectArg[];
  typeArgs?: any[];
};

/**
 * @description
 * It provides caching for moveCall, RPC Request, and API Request.
 *
 *
 * @example
 * ```typescript
 * const scallopCache = new scallopCache(<parameters>);
 * scallopCache.<indexer functions>();
 * await scallopCache.<indexer async functions>();
 * ```
 */

export class ScallopCache {
  public readonly queryClient: QueryClient;
  public readonly _suiKit?: SuiKit;
  private tokenBucket: TokenBucket;

  public constructor(
    cacheOptions?: QueryClientConfig,
    suiKit?: SuiKit,
    tokenBucket?: TokenBucket
  ) {
    this.queryClient = new QueryClient(cacheOptions ?? DEFAULT_CACHE_OPTIONS);
    this._suiKit = suiKit;
    this.tokenBucket =
      tokenBucket ??
      new TokenBucket(DEFAULT_TOKENS_PER_INTERVAL, DEFAULT_INTERVAL_IN_MS);
  }

  private get suiKit(): SuiKit {
    if (!this._suiKit) {
      throw new Error('SuiKit instance is not initialized');
    }
    return this._suiKit;
  }

  private get client(): SuiClient {
    return this.suiKit.client();
  }

  /**
   * @description Invalidate cache based on the refetchType parameter
   * @param refetchType Determines the type of queries to be refetched. Defaults to `active`.
   *
   * - `active`: Only queries that match the refetch predicate and are actively being rendered via useQuery and related functions will be refetched in the background.
   * - `inactive`: Only queries that match the refetch predicate and are NOT actively being rendered via useQuery and related functions will be refetched in the background.
   * - `all`: All queries that match the refetch predicate will be refetched in the background.
   * - `none`: No queries will be refetched. Queries that match the refetch predicate will only be marked as invalid.
   */
  public invalidateAndRefetchAllCache(
    refetchType: 'all' | 'active' | 'inactive' | 'none'
  ) {
    return this.queryClient.invalidateQueries({
      refetchType,
    });
  }

  public async resolveArgs(
    txb: SuiTxBlock,
    args: SuiObjectArg[]
  ): Promise<SuiObjectArg[]> {
    return await Promise.all(
      args.map(async (arg) => {
        if (typeof arg === 'string') {
          const objData = (await this.queryGetObject(arg, { showOwner: true }))
            ?.data;
          if (!objData) return arg;
          const owner = objData?.owner as any;
          if (!owner) return arg;

          if ('Shared' in owner) {
            return txb.sharedObjectRef({
              objectId: objData.objectId,
              initialSharedVersion: owner.Shared.initial_shared_version,
              mutable: true,
            });
          } else {
            return txb.objectRef({
              objectId: objData.objectId,
              version: objData.version,
              digest: objData.digest,
            });
          }
        } else if ('objectId' in arg && 'version' in arg && 'digest' in arg) {
          return txb.objectRef({
            objectId: arg.objectId,
            version: arg.version as string,
            digest: arg.digest,
          });
        } else {
          return arg;
        }
      })
    );
  }

  /**
   * @description Provides cache for inspectTxn of the SuiKit.
   * @param QueryInspectTxnParams
   * @param txBlock
   * @returns Promise<DevInspectResults>
   */
  public async queryInspectTxn({
    queryTarget,
    args,
    typeArgs,
  }: QueryInspectTxnParams): Promise<DevInspectResults | null> {
    const txBlock = new SuiTxBlock();

    const resolvedArgs = await this.resolveArgs(txBlock, args);

    txBlock.moveCall(queryTarget, resolvedArgs, typeArgs);

    const query = await this.queryClient.fetchQuery({
      queryKey: typeArgs
        ? ['inspectTxn', queryTarget, JSON.stringify(args)]
        : [
            'inspectTxn',
            queryTarget,
            JSON.stringify(args),
            JSON.stringify(typeArgs),
          ],
      queryFn: async () => {
        return await callWithRateLimit(this.tokenBucket, () =>
          this.suiKit.inspectTxn(txBlock)
        );
      },
    });
    return query;
  }

  /**
   * @description Provides cache for getObject of the SuiKit.
   * @param objectId
   * @param QueryObjectParams
   * @returns Promise<SuiObjectResponse>
   */
  public async queryGetObject(
    objectId: string,
    options?: SuiObjectDataOptions
  ): Promise<SuiObjectResponse | null> {
    const queryKey = ['getObject', objectId, this.suiKit.currentAddress()];
    if (options) {
      queryKey.push(JSON.stringify(options));
    }
    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        return await callWithRateLimit(this.tokenBucket, () =>
          this.client.getObject({
            id: objectId,
            options,
          })
        );
      },
    });
  }

  /**
   * @description Provides cache for getObjects of the SuiKit.
   * @param objectIds
   * @returns Promise<SuiObjectData[]>
   */
  public async queryGetObjects(
    objectIds: string[],
    options?: SuiObjectDataOptions
  ): Promise<SuiObjectData[]> {
    if (objectIds.length === 0) return [];
    const queryKey = [
      'getObjects',
      JSON.stringify(objectIds),
      this.suiKit.currentAddress(),
    ];
    if (options) {
      queryKey.push(JSON.stringify(options));
    }
    return this.queryClient.fetchQuery({
      queryKey: queryKey,
      queryFn: async () => {
        return await callWithRateLimit(this.tokenBucket, () =>
          this.suiKit.getObjects(objectIds, options)
        );
      },
    });
  }

  /**
   * @description Provides cache for getOwnedObjects of the SuiKit.
   * @param input
   * @returns Promise<PaginatedObjectsResponse>
   */
  public async queryGetOwnedObjects(input: GetOwnedObjectsParams) {
    const queryKey = ['getOwnedObjects', input.owner];
    if (input.cursor) {
      queryKey.push(JSON.stringify(input.cursor));
    }
    if (input.options) {
      queryKey.push(JSON.stringify(input.options));
    }
    if (input.filter) {
      queryKey.push(JSON.stringify(input.filter));
    }
    if (input.limit) {
      queryKey.push(JSON.stringify(input.limit));
    }

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        return await callWithRateLimit(this.tokenBucket, () =>
          this.client.getOwnedObjects(input)
        );
      },
    });
  }

  public async queryGetDynamicFields(
    input: GetDynamicFieldsParams
  ): Promise<DynamicFieldPage | null> {
    const queryKey = ['getDynamicFields', input.parentId];
    if (input.cursor) {
      queryKey.push(JSON.stringify(input.cursor));
    }
    if (input.limit) {
      queryKey.push(JSON.stringify(input.limit));
    }

    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        return await callWithRateLimit(this.tokenBucket, () =>
          this.client.getDynamicFields(input)
        );
      },
    });
  }

  public async queryGetDynamicFieldObject(
    input: GetDynamicFieldObjectParams
  ): Promise<SuiObjectResponse | null> {
    const queryKey = [
      'getDynamicFieldObject',
      input.parentId,
      input.name.type,
      input.name.value,
    ];
    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        return await callWithRateLimit(this.tokenBucket, () =>
          this.client.getDynamicFieldObject(input)
        );
      },
    });
  }

  public async queryGetAllCoinBalances(
    owner: string
  ): Promise<{ [k: string]: string }> {
    const queryKey = ['getAllCoinBalances', owner];
    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        const allBalances = await callWithRateLimit(this.tokenBucket, () =>
          this.client.getAllBalances({ owner })
        );
        if (!allBalances) return {};
        const balances = allBalances.reduce(
          (acc, coinBalance) => {
            if (coinBalance.totalBalance !== '0') {
              acc[normalizeStructTag(coinBalance.coinType)] =
                coinBalance.totalBalance;
            }
            return acc;
          },
          {} as { [k: string]: string }
        );

        // Set query data for each coin balance
        for (const coinType in balances) {
          const coinBalanceQueryKey = [
            'getCoinBalance',
            normalizeSuiAddress(owner),
            normalizeStructTag(coinType),
          ];
          this.queryClient.setQueryData(
            coinBalanceQueryKey,
            balances[coinType]
          );
        }

        return balances;
      },
    });
  }

  public async queryGetCoinBalance(input: GetBalanceParams): Promise<string> {
    if (!input.coinType) return '0';

    const queryKey = [
      'getCoinBalance',
      normalizeSuiAddress(input.owner),
      normalizeStructTag(input.coinType),
    ];
    return this.queryClient.fetchQuery({
      queryKey,
      queryFn: async () => {
        if (!input.coinType) return '0';
        return (
          (await this.queryGetAllCoinBalances(input.owner))[
            normalizeStructTag(input.coinType)
          ] ?? '0'
        );
      },
    });
  }
}
