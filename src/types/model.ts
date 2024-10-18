import type { SuiTransactionBlockResponse } from '@mysten/sui/client';
import type { Transaction, TransactionResult } from '@mysten/sui/transactions';
import type { SuiKit, SuiKitParams, NetworkType } from '@scallop-io/sui-kit';
import type {
  ScallopAddress,
  ScallopQuery,
  ScallopUtils,
  ScallopBuilder,
  ScallopIndexer,
} from '../models';
import { ScallopCache } from 'src/models/scallopCache';

export type ScallopClientFnReturnType<T extends boolean> = T extends true
  ? SuiTransactionBlockResponse
  : Transaction;

export type ScallopClientVeScaReturnType<T extends boolean> = T extends true
  ? SuiTransactionBlockResponse
  : {
      tx: Transaction;
      scaCoin: TransactionResult;
    };

export type ScallopBaseInstanceParams = {
  suiKit?: SuiKit;
};

export type ScallopCacheInstanceParams = ScallopBaseInstanceParams;

export type ScallopAddressInstanceParams = ScallopBaseInstanceParams & {
  cache?: ScallopCache;
};

export type ScallopIndexerInstanceParams = {
  cache?: ScallopCache;
};

export type ScallopUtilsInstanceParams = ScallopBaseInstanceParams & {
  address?: ScallopAddress;
};

export type ScallopQueryInstanceParams = ScallopBaseInstanceParams & {
  utils?: ScallopUtils;
  indexer?: ScallopIndexer;
};

export type ScallopBuilderInstanceParams = ScallopBaseInstanceParams & {
  query?: ScallopQuery;
};

export type ScallopClientInstanceParams = ScallopBaseInstanceParams & {
  builder?: ScallopBuilder;
};

export type ScallopAddressParams = {
  id: string;
  auth?: string;
  network?: NetworkType;
};

export type ScallopParams = {
  addressesId?: string;
  walletAddress?: string;
} & SuiKitParams;

export type ScallopClientParams = ScallopParams;

export type ScallopBuilderParams = ScallopParams & {
  pythEndpoints?: string[];
};

export type ScallopQueryParams = ScallopParams;

export type ScallopUtilsParams = ScallopParams & {
  pythEndpoints?: string[];
};
