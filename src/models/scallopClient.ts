import {
  normalizeSuiAddress,
  TransactionArgument,
  SUI_TYPE_ARG,
  SUI_FRAMEWORK_ADDRESS,
  normalizeStructTag,
} from '@mysten/sui.js';
import { SuiKit } from '@scallop-io/sui-kit';
import { ScallopAddress } from './scallopAddress';
import { ScallopUtils } from './scallopUtils';
import { ScallopTxBuilder } from './txBuilder';
import type {
  ScallopParams,
  SupportAssetCoins,
  SupportCollateralCoins,
  SupportCoins,
  MarketInterface,
  ObligationInterface,
} from '../types';

/**
 * ### Scallop Client
 *
 * it provides contract interaction operations for general users.
 *
 * #### Usage
 *
 * ```typescript
 * const clent  = new Scallop(<parameters>);
 * client.<interact functions>();
 * ```
 */
export class ScallopClient {
  public suiKit: SuiKit;
  public address: ScallopAddress;
  public walletAddress: string;

  private _utils: ScallopUtils;
  private _isTestnet: boolean;

  public constructor(
    params: ScallopParams,
    address: ScallopAddress,
    walletAddress?: string,
    isTestnet?: boolean
  ) {
    this.suiKit = new SuiKit(params);
    this.address = address;
    const normalizedWalletAddress = normalizeSuiAddress(
      walletAddress || this.suiKit.currentAddress()
    );
    this.walletAddress = normalizedWalletAddress;
    this._utils = new ScallopUtils(params);
    this._isTestnet =
      isTestnet ||
      (params.networkType ? params.networkType === 'testnet' : false);
  }

  /**
   * Query market data.
   *
   * @return Market data
   */
  public async queryMarket() {
    const txBuilder = new ScallopTxBuilder();
    const queryTxn = txBuilder.queryMarket(
      this.address.get('core.packages.query.id'),
      this.address.get('core.market')
    );
    const queryResult = await this.suiKit.inspectTxn(queryTxn);
    const queryData: MarketInterface = queryResult.events[0].parsedJson;
    return queryData;
  }

  /**
   * Query obligations data.
   *
   * @param ownerAddress - The owner address.
   * @return Obligations data
   */
  async getObligations(ownerAddress?: string) {
    const owner = ownerAddress || this.walletAddress;
    const keyObjectRefs =
      await this.suiKit.rpcProvider.provider.getOwnedObjects({
        owner,
        filter: {
          StructType: `${this.address.get(
            'core.packages.protocol.id'
          )}::obligation::ObligationKey`,
        },
      });
    const keyIds = keyObjectRefs.data
      .map((ref: any) => ref?.data?.objectId)
      .filter((id: any) => id !== undefined) as string[];
    const keyObjects = await this.suiKit.getObjects(keyIds);
    const obligations: { id: string; keyId: string }[] = [];
    for (const keyObject of keyObjects) {
      const keyId = keyObject.objectId;
      const fields = keyObject.objectFields as any;
      const obligationId = fields['ownership']['fields']['of'];
      obligations.push({ id: obligationId, keyId });
    }
    return obligations;
  }

  /**
   * Query obligation data.
   *
   * @param obligationId - The obligation id from protocol package.
   * @return Obligation data
   */
  public async queryObligation(obligationId: string) {
    const txBuilder = new ScallopTxBuilder();
    const queryTxn = txBuilder.queryObligation(
      this.address.get('core.packages.query.id'),
      obligationId
    );
    const queryResult = await this.suiKit.inspectTxn(queryTxn);
    const queryData: ObligationInterface = queryResult.events[0].parsedJson;
    return queryData;
  }

  /**
   * Open obligation.
   *
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @return Transaction block response or transaction block
   */
  public async openObligation(sign: boolean = true) {
    const txBuilder = new ScallopTxBuilder();
    txBuilder.openObligationEntry(
      this.address.get('core.version'),
      this.address.get('core.packages.protocol.id')
    );
    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }

  /**
   * Deposit collateral into the specific pool.
   *
   * @param coinName - Types of collateral coin.
   * @param amount - The amount of coins would depoist.
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @param obligationId - The obligation object.
   * @param walletAddress - The wallet address of the owner.
   * @return Transaction block response or transaction block
   */
  public async depositCollateral(
    coinName: SupportCollateralCoins,
    amount: number,
    sign: boolean = true,
    obligationId?: string,
    walletAddress?: string
  ) {
    const txBuilder = new ScallopTxBuilder();
    const coinPackageId = this.address.get(`core.coins.${coinName}.id`);
    const coinType =
      coinName === 'sui'
        ? SUI_TYPE_ARG
        : this._utils.parseCoinTpe(coinPackageId, coinName);
    const ownerAddress = walletAddress || this.walletAddress;
    const coins = await this._utils.selectCoins(ownerAddress, amount, coinType);
    const [takeCoin, leftCoin] = txBuilder.takeCoins(coins, amount, coinType);
    if (obligationId) {
      txBuilder.addCollateral(
        this.address.get('core.version'),
        this.address.get('core.packages.protocol.id'),
        this.address.get('core.market'),
        obligationId,
        takeCoin,
        coinType
      );
      txBuilder.suiTxBlock.transferObjects([leftCoin], ownerAddress);
    } else {
      const [obligation, obligationKey, hotPotato] = txBuilder.openObligation(
        this.address.get('core.version'),
        this.address.get('core.packages.protocol.id')
      );

      txBuilder.addCollateral(
        this.address.get('core.version'),
        this.address.get('core.packages.protocol.id'),
        this.address.get('core.market'),
        obligation,
        takeCoin,
        coinType
      );
      txBuilder.returnObligation(
        this.address.get('core.version'),
        this.address.get('core.packages.protocol.id'),
        obligation,
        hotPotato
      );
      txBuilder.suiTxBlock.transferObjects([leftCoin], ownerAddress);
      txBuilder.suiTxBlock.transferObjects([obligationKey], ownerAddress);
    }

    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }

  /**
   * Withdraw collateral from the specific pool.
   *
   * @param coinName - Types of collateral coin.
   * @param amount - The amount of coins would depoist.
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @param obligationId - The obligation object.
   * @param obligationKey - The obligation key object to verifying obligation authority.
   * @return Transaction block response or transaction block
   */
  public async withdrawCollateral(
    coinName: SupportCollateralCoins,
    amount: number,
    sign: boolean = true,
    obligationId: string,
    obligationKey: string
  ) {
    const txBuilder = new ScallopTxBuilder();
    const coinPackageId = this.address.get(`core.coins.${coinName}.id`);
    const coinType =
      coinName === 'sui'
        ? normalizeStructTag(SUI_TYPE_ARG)
        : this._utils.parseCoinTpe(coinPackageId, coinName);

    // update prices
    const obligation = await this.queryObligation(obligationId);
    const collateralCoinTypes = obligation.collaterals.map((collateral) => {
      return `0x${collateral.type.name}`;
    });
    const debtCoinTypes = obligation.debts.map((debt) => {
      return `0x${debt.type.name}`;
    });
    const updateCoinTypes = [
      ...new Set([...collateralCoinTypes, ...debtCoinTypes, coinType]),
    ];

    for (const updateCoinType of updateCoinTypes) {
      const updateCoin = this._utils.getCoinNameFromCoinTpe(updateCoinType);

      const [vaaFromFeeId] = await this._utils.getVaas(
        [this.address.get(`core.coins.${updateCoin}.oracle.pyth.feed`)],
        this._isTestnet
      );

      txBuilder.updatePrice(
        this._isTestnet ? ['supra', 'pyth', 'switchboard'] : ['pyth'],
        this.address.get('core.packages.xOracle.id'),
        this.address.get('core.oracles.xOracle'),
        this.address.get('core.packages.pyth.id'),
        this.address.get('core.oracles.pyth.registry'),
        this.address.get('core.oracles.pyth.state'),
        this.address.get('core.oracles.pyth.wormholeState'),
        this.address.get(`core.coins.${updateCoin}.oracle.pyth.feedObject`),
        vaaFromFeeId,
        this.address.get('core.packages.switchboard.id'),
        this.address.get('core.oracles.switchboard.registry'),
        this.address.get(`core.coins.${updateCoin}.oracle.switchboard`),
        this.address.get('core.packages.supra.id'),
        this.address.get('core.oracles.supra.registry'),
        this.address.get(`core.oracles.supra.holder`),
        updateCoinType
      );
    }

    txBuilder.takeCollateralEntry(
      this.address.get('core.version'),
      this.address.get('core.packages.protocol.id'),
      this.address.get('core.market'),
      this.address.get('core.coinDecimalsRegistry'),
      this.address.get('core.oracles.xOracle'),
      obligationId,
      obligationKey,
      amount,
      coinType
    );

    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }

  /**
   * Deposit asset into the specific pool.
   *
   * @param coinName - Types of asset coin.
   * @param amount - The amount of coins would depoist.
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @param walletAddress - The wallet address of the owner.
   * @return Transaction block response or transaction block
   */
  public async deposit(
    coinName: SupportAssetCoins,
    amount: number,
    sign: boolean = true,
    walletAddress?: string
  ) {
    const txBuilder = new ScallopTxBuilder();
    const coinPackageId = this.address.get(`core.coins.${coinName}.id`);
    const coinType =
      coinName === 'sui'
        ? SUI_TYPE_ARG
        : this._utils.parseCoinTpe(coinPackageId, coinName);
    const ownerAddress = walletAddress || this.walletAddress;
    const coins = await this._utils.selectCoins(ownerAddress, amount, coinType);
    const [takeCoin, leftCoin] = txBuilder.takeCoins(coins, amount, coinType);

    txBuilder.depositEntry(
      this.address.get('core.version'),
      this.address.get('core.packages.protocol.id'),
      this.address.get('core.market'),
      takeCoin,
      coinType
    );
    txBuilder.suiTxBlock.transferObjects([leftCoin], ownerAddress);

    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }

  /**
   * Withdraw asset from the specific pool, must return market coin.
   *
   * @param coinName - Types of asset coin.
   * @param amount - The amount of coins would withdraw.
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @param walletAddress - The wallet address of the owner.
   * @return Transaction block response or transaction block
   */
  public async withdraw(
    coinName: SupportAssetCoins,
    amount: number,
    sign: boolean = true,
    walletAddress?: string
  ) {
    const txBuilder = new ScallopTxBuilder();
    const coinPackageId = this.address.get(`core.coins.${coinName}.id`);
    const coinType =
      coinName === 'sui'
        ? SUI_TYPE_ARG
        : this._utils.parseCoinTpe(coinPackageId, coinName);
    const MarketCoinType = `${this.address.get(
      'core.packages.protocol.id'
    )}::reserve::MarketCoin<${this._utils.parseCoinTpe(
      coinName === 'sui' ? SUI_FRAMEWORK_ADDRESS : coinPackageId,
      coinName
    )}>`;

    const ownerAddress = walletAddress || this.walletAddress;
    const marketCoins = await this._utils.selectCoins(
      ownerAddress,
      amount,
      MarketCoinType
    );
    const [takeCoin, leftCoin] = txBuilder.takeCoins(
      marketCoins,
      amount,
      MarketCoinType
    );

    txBuilder.withdrawEntry(
      this.address.get('core.version'),
      this.address.get('core.packages.protocol.id'),
      this.address.get('core.market'),
      takeCoin,
      coinType
    );
    txBuilder.suiTxBlock.transferObjects([leftCoin], ownerAddress);

    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }

  /**
   * borrow asset from the specific pool.
   *
   * @param coinName - Types of asset coin.
   * @param amount - The amount of coins would borrow.
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @param obligationId - The obligation object.
   * @param obligationKey - The obligation key object to verifying obligation authority.
   * @return Transaction block response or transaction block
   */
  public async borrow(
    coinName: SupportAssetCoins,
    amount: number,
    sign: boolean = true,
    obligationId: string,
    obligationKey: string
  ) {
    const txBuilder = new ScallopTxBuilder();
    const coinPackageId = this.address.get(`core.coins.${coinName}.id`);
    const coinType =
      coinName === 'sui'
        ? normalizeStructTag(SUI_TYPE_ARG)
        : this._utils.parseCoinTpe(coinPackageId, coinName);

    // update prices
    const obligation = await this.queryObligation(obligationId);
    const collateralCoinTypes = obligation.collaterals.map((collateral) => {
      return `0x${collateral.type.name}`;
    });
    const debtCoinTypes = obligation.debts.map((debt) => {
      return `0x${debt.type.name}`;
    });
    const updateCoinTypes = [
      ...new Set([...collateralCoinTypes, ...debtCoinTypes, coinType]),
    ];

    for (const updateCoinType of updateCoinTypes) {
      const updateCoin = this._utils.getCoinNameFromCoinTpe(updateCoinType);
      const [vaaFromFeeId] = await this._utils.getVaas(
        [this.address.get(`core.coins.${updateCoin}.oracle.pyth.feed`)],
        this._isTestnet
      );

      txBuilder.updatePrice(
        this._isTestnet ? ['supra', 'pyth', 'switchboard'] : ['pyth'],
        this.address.get('core.packages.xOracle.id'),
        this.address.get('core.oracles.xOracle'),
        this.address.get('core.packages.pyth.id'),
        this.address.get('core.oracles.pyth.registry'),
        this.address.get('core.oracles.pyth.state'),
        this.address.get('core.oracles.pyth.wormholeState'),
        this.address.get(`core.coins.${updateCoin}.oracle.pyth.feedObject`),
        vaaFromFeeId,
        this.address.get('core.packages.switchboard.id'),
        this.address.get('core.oracles.switchboard.registry'),
        this.address.get(`core.coins.${updateCoin}.oracle.switchboard`),
        this.address.get('core.packages.supra.id'),
        this.address.get('core.oracles.supra.registry'),
        this.address.get(`core.oracles.supra.holder`),
        updateCoinType
      );
    }

    txBuilder.borrowEntry(
      this.address.get('core.version'),
      this.address.get('core.packages.protocol.id'),
      this.address.get('core.market'),
      this.address.get('core.coinDecimalsRegistry'),
      this.address.get('core.oracles.xOracle'),
      obligationId,
      obligationKey,
      amount,
      coinType
    );

    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }

  /**
   * Repay asset into the specific pool.
   *
   * @param coinName - Types of asset coin.
   * @param amount - The amount of coins would repay.
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @param obligationId - The obligation object.
   * @param walletAddress - The wallet address of the owner.
   * @return Transaction block response or transaction block
   */
  public async repay(
    coinName: SupportAssetCoins,
    amount: number,
    sign: boolean = true,
    obligationId: string,
    walletAddress?: string
  ) {
    const txBuilder = new ScallopTxBuilder();
    const coinPackageId = this.address.get(`core.coins.${coinName}.id`);
    const coinType =
      coinName === 'sui'
        ? SUI_TYPE_ARG
        : this._utils.parseCoinTpe(coinPackageId, coinName);
    const ownerAddress = walletAddress || this.walletAddress;
    const coins = await this._utils.selectCoins(ownerAddress, amount, coinType);
    const [takeCoin, leftCoin] = txBuilder.takeCoins(coins, amount, coinType);

    txBuilder.repay(
      this.address.get('core.version'),
      this.address.get('core.packages.protocol.id'),
      this.address.get('core.market'),
      obligationId,
      takeCoin,
      coinType
    );
    txBuilder.suiTxBlock.transferObjects([leftCoin], ownerAddress);

    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }

  /**
   * FlashLoan asset from the specific pool.
   *
   * @param coinName - Types of asset coin.
   * @param amount - The amount of coins would repay.
   * @param callback - The callback function to build transaction block and return coin argument.
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @return Transaction block response or transaction block
   */
  public async flashLoan(
    coinName: SupportAssetCoins,
    amount: number,
    callback: (
      txBlock: ScallopTxBuilder,
      coin: TransactionArgument
    ) => TransactionArgument,
    sign: boolean = true
  ) {
    const txBuilder = new ScallopTxBuilder();
    const coinPackageId = this.address.get(`core.coins.${coinName}.id`);
    const coinType =
      coinName === 'sui'
        ? SUI_TYPE_ARG
        : this._utils.parseCoinTpe(coinPackageId, coinName);

    const [coin, loan] = txBuilder.borrowFlashLoan(
      this.address.get('core.version'),
      this.address.get('core.packages.protocol.id'),
      this.address.get('core.market'),
      amount,
      coinType
    );

    txBuilder.repayFlashLoan(
      this.address.get('core.version'),
      this.address.get('core.packages.protocol.id'),
      this.address.get('core.market'),
      callback(txBuilder, coin),
      loan,
      coinType
    );

    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }

  /**
   * Mint and get test coin.
   *
   * @remarks
   *  Only be used on the test network.
   *
   * @param coinName - Types of coins supported on the test network.
   * @param amount - The amount of coins minted and received.
   * @param receiveAddress - The wallet address that receives the coins.
   * @param sign - Decide to directly sign the transaction or return the transaction block.
   * @return Transaction block response or transaction block
   */
  public async mintTestCoin(
    coinName: Exclude<SupportCoins, 'sui'>,
    amount: number,
    sign: boolean = true,
    receiveAddress?: string
  ) {
    const txBuilder = new ScallopTxBuilder();
    const recipient = receiveAddress || this.walletAddress;
    txBuilder.mintTestCoinEntry(
      this.address.get('core.packages.testCoin.id'),
      this.address.get(`core.coins.${coinName}.treasury`),
      coinName,
      amount,
      recipient
    );

    if (sign) {
      return this.suiKit.signAndSendTxn(txBuilder.suiTxBlock);
    } else {
      return txBuilder.txBlock;
    }
  }
}
