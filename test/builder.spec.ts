import * as dotenv from 'dotenv';
import { describe, it, expect } from 'vitest';
import { TransactionBlock } from '@scallop-io/sui-kit';
import { Scallop } from '../src';
import type { NetworkType } from '@scallop-io/sui-kit';

dotenv.config();

const ENABLE_LOG = true;

const NETWORK: NetworkType = 'mainnet';

describe('Test Scallop Core Builder', async () => {
  const scallopSDK = new Scallop({
    secretKey: process.env.SECRET_KEY,
    networkType: NETWORK,
  });
  const scallopBuilder = await scallopSDK.createScallopBuilder();
  const sender = scallopBuilder.walletAddress;

  console.info('Sender:', sender);

  it('"openObligationEntry" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    tx.openObligationEntry();
    const openObligationResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('OpenObligationResult:', openObligationResult);
    }
    expect(openObligationResult.effects?.status.status).toEqual('success');
  });

  it('"addCollateralQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "addCollateralQuick".
    tx.setSender(sender);
    await tx.addCollateralQuick(10 ** 7, 'sui');
    const addCollateralQuickResult =
      await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('AddCollateralQuickResult:', addCollateralQuickResult);
    }
    expect(addCollateralQuickResult.effects?.status.status).toEqual('success');
  });

  it('"takeCollateralQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "takeCollateralQuick".
    tx.setSender(sender);
    const coin = await tx.takeCollateralQuick(10 ** 7, 'sui');
    tx.transferObjects([coin], sender);
    const takeCollateralQuickResult =
      await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('TakeCollateralQuickResult:', takeCollateralQuickResult);
    }
    expect(takeCollateralQuickResult.effects?.status.status).toEqual('success');
  });

  it('"depositQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "depositQuick".
    tx.setSender(sender);
    const marketCoin = await tx.depositQuick(10 ** 7, 'sui');
    tx.transferObjects([marketCoin], sender);
    const depositQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('DepositQuickResult:', depositQuickResult);
    }
    expect(depositQuickResult.effects?.status.status).toEqual('success');
  });

  it('"withdrawQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "withdrawQuick".
    tx.setSender(sender);
    const coin = await tx.withdrawQuick(10 ** 7, 'sui');
    tx.transferObjects([coin], sender);
    const withdrawQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('WithdrawQuickResult:', withdrawQuickResult);
    }
    expect(withdrawQuickResult.effects?.status.status).toEqual('success');
  });

  it('"borrowQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "borrowQuick".
    tx.setSender(sender);
    const borrowedCoin = await tx.borrowQuick(4 * 10 ** 7, 'sui');
    // Transfer borrowed coin to sender.
    tx.transferObjects([borrowedCoin], sender);
    const borrowQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('BorrowQuickResult:', borrowQuickResult);
    }
    expect(borrowQuickResult.effects?.status.status).toEqual('success');
  });

  it('"repayQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "repayQuick".
    tx.setSender(sender);
    await tx.repayQuick(4 * 10 ** 7, 'sui');
    const repayQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('RepayQuickResult:', repayQuickResult);
    }
    expect(repayQuickResult.effects?.status.status).toEqual('success');
  });

  it('"borrowFlashLoan" & "repayFlashLoan" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    tx.setSender(sender);
    const [coin, loan] = tx.borrowFlashLoan(10 ** 8, 'sui');
    /**
     * Do something with the borrowed coin here
     * such as pass it to a dex to make a profit.
     */
    tx.repayFlashLoan(coin, loan, 'sui');
    const borrowFlashLoanResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('BorrowFlashLoanResult:', borrowFlashLoanResult);
    }
    expect(borrowFlashLoanResult.effects?.status.status).toEqual('success');
  });

  it('"ScallopTxBlock" should be an instance of "TransactionBlock"', async () => {
    const tx = scallopBuilder.createTxBlock();
    tx.setSender(sender);
    expect(tx.txBlock).toBeInstanceOf(TransactionBlock);
    /**
     * For example, you can do the following:
     * 1. split SUI from gas.
     * 2. depoit SUI to Scallop.
     * 3. transfer SUI Market Coin to sender.
     */
    const suiTxBlock = tx.txBlock;
    const [coin] = suiTxBlock.splitCoins(suiTxBlock.gas, [
      suiTxBlock.pure(10 ** 6),
    ]);
    const marketCoin = tx.deposit(coin, 'sui');
    suiTxBlock.transferObjects([marketCoin], suiTxBlock.pure(sender));
    const txBlockResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('TxBlockResult:', txBlockResult);
    }
    expect(txBlockResult.effects?.status.status).toEqual('success');
  });

  it('"updateAssetPricesQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "updateAssetPricesQuick".
    tx.setSender(sender);
    await tx.updateAssetPricesQuick(['sui']);
    const updateAssetPricesResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('UpdateAssetPricesResult:', updateAssetPricesResult);
    }
    expect(updateAssetPricesResult.effects?.status.status).toEqual('success');
  });
});

describe('Test Scallop Spool Builder', async () => {
  const scallopSDK = new Scallop({
    secretKey: process.env.SECRET_KEY,
    networkType: NETWORK,
  });
  const scallopBuilder = await scallopSDK.createScallopBuilder();
  const sender = scallopBuilder.walletAddress;

  console.info('Sender:', sender);

  it('"createStakeAccount" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    const stakeAccount = tx.createStakeAccount('ssui');
    tx.transferObjects([stakeAccount], sender);
    const createStakeAccountResult =
      await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('CreateStakeAccountResult:', createStakeAccountResult);
    }
    expect(createStakeAccountResult.effects?.status.status).toEqual('success');
  });

  it('"stakeQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "stakeQuick".
    tx.setSender(sender);
    await tx.stakeQuick(10 ** 6, 'ssui');
    const stakeQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('StakeQuickResult:', stakeQuickResult);
    }
    expect(stakeQuickResult.effects?.status.status).toEqual('success');
  });

  it('"unstakeQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "unstakeQuick".
    tx.setSender(sender);
    const marketCoins = await tx.unstakeQuick(10 ** 6, 'ssui');
    tx.transferObjects(marketCoins, sender);
    const unstakeQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('UnstakeQuickResult:', unstakeQuickResult);
    }
    expect(unstakeQuickResult.effects?.status.status).toEqual('success');
  });

  it('"claimQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "claimQuick".
    tx.setSender(sender);
    const rewardCoins = await tx.claimQuick('ssui');
    tx.transferObjects(rewardCoins, sender);
    const claimQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('ClaimQuickResult:', claimQuickResult);
    }
    expect(claimQuickResult.effects?.status.status).toEqual('success');
  });
});

describe('Test Scallop Borrow Incentive Builder', async () => {
  const scallopSDK = new Scallop({
    secretKey: process.env.SECRET_KEY,
    networkType: NETWORK,
  });
  const scallopBuilder = await scallopSDK.createScallopBuilder();
  const sender = scallopBuilder.walletAddress;

  console.info('Sender:', sender);

  it('"stakeObligationQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "stakeObligationQuick".
    tx.setSender(sender);
    await tx.stakeObligationQuick();
    const stakeObligationQuickResult =
      await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('StakeObligationQuickResult:', stakeObligationQuickResult);
    }
    expect(stakeObligationQuickResult.effects?.status.status).toEqual(
      'success'
    );
  });

  it('"unstakeObligationQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "unstakeObligationQuick".
    tx.setSender(sender);
    await tx.unstakeObligationQuick();
    const unstakeObligationQuickResult =
      await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info(
        'UnstakeObligationQuickResult:',
        unstakeObligationQuickResult
      );
    }
    expect(unstakeObligationQuickResult.effects?.status.status).toEqual(
      'success'
    );
  });

  it('"claimBorrowIncentiveQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "claimQuick".
    tx.setSender(sender);
    const rewardCoins = await tx.claimBorrowIncentiveQuick('sui');
    tx.transferObjects([rewardCoins], sender);
    const claimBorrowIncentiveQuickResult =
      await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info(
        'ClaimBorrowIncentiveQuickResult:',
        claimBorrowIncentiveQuickResult
      );
    }
    expect(claimBorrowIncentiveQuickResult.effects?.status.status).toEqual(
      'success'
    );
  });
});

describe('Test Scallop VeSca Builder', async () => {
  const scallopSDK = new Scallop({
    secretKey: process.env.SECRET_KEY,
    networkType: NETWORK,
  });
  const scallopBuilder = await scallopSDK.createScallopBuilder();
  const sender = scallopBuilder.walletAddress;

  console.info('Sender:', sender);

  it('"lockScaQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "lockScaQuick".
    tx.setSender(sender);

    // TODO: get the lockAt from untils.
    const lockAt = 1000;

    await tx.lockScaQuick(10 * 10 ** 8, lockAt);
    const lockScaQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('LockScaQuickResult:', lockScaQuickResult);
    }
    expect(lockScaQuickResult.effects?.status.status).toEqual('success');
  });

  it('"redeemScaQuick" should succeed', async () => {
    const tx = scallopBuilder.createTxBlock();
    // Sender is required to invoke "redeemScaQuick".
    tx.setSender(sender);
    await tx.redeemScaQuick();
    const redeemScaQuickResult = await scallopBuilder.signAndSendTxBlock(tx);
    if (ENABLE_LOG) {
      console.info('RedeemScaQuickResult:', redeemScaQuickResult);
    }
    expect(redeemScaQuickResult.effects?.status.status).toEqual('success');
  });
});
