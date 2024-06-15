import { bigIntAsString } from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';
import { transactionSchema } from './transaction.schema';
import { customChainSchema } from './custom-chain.schema';
import { blockHeadersSchema, withdrawalSchema } from '../block-headers.schema';
import { commonSchema } from './common.schema';

const customChainSaveSchema = customChainSchema
  .omit({
    networkId: true,
    chainId: true,
  })
  .merge(
    z.object({
      networkId: bigIntAsString,
      chainId: bigIntAsString,
    }),
  )
  .partial();

const commonSaveSchema = commonSchema
  .omit({
    customChain: true,
  })
  .merge(
    z.object({
      customChain: customChainSaveSchema,
    }),
  )
  .partial();

export const transactionSaveSchema = transactionSchema
  .omit({
    blockNumber: true,
    value: true,
    gas: true,
    gasPrice: true,
    type: true,
    maxFeePerGas: true,
    maxPriorityFeePerGas: true,
    nonce: true,
    chainId: true,
    gasLimit: true,
    v: true,
    common: true,
  })
  .merge(
    z.object({
      blockNumber: bigIntAsString,
      value: bigIntAsString,
      gas: bigIntAsString,
      gasPrice: bigIntAsString,
      type: bigIntAsString,
      maxFeePerGas: bigIntAsString,
      maxPriorityFeePerGas: bigIntAsString,
      nonce: bigIntAsString,
      chainId: bigIntAsString,
      gasLimit: bigIntAsString,
      v: bigIntAsString,
      common: commonSaveSchema.partial(),
    }),
  )
  .partial();

export const withdrawalSaveSchema = withdrawalSchema
  .omit({
    amount: true,
    index: true,
    validatorIndex: true,
  })
  .merge(
    z.object({
      amount: bigIntAsString,
      index: bigIntAsString,
      validatorIndex: bigIntAsString,
    }),
  )
  .partial();

export const blockHeadersSimplifiedSaveSchema = blockHeadersSchema
  .omit({
    blobGasUsed: true,
    excessBlobGas: true,
    difficulty: true,
    number: true,
    gasLimit: true,
    gasUsed: true,
    timestamp: true,
    nonce: true,
    totalDifficulty: true,
    baseFeePerGas: true,
    size: true,
    withdrawals: true,
    transactions: true,
  })
  .merge(
    z.object({
      blobGasUsed: bigIntAsString,
      excessBlobGas: bigIntAsString,
      difficulty: bigIntAsString,
      number: bigIntAsString,
      gasLimit: bigIntAsString,
      gasUsed: bigIntAsString,
      timestamp: bigIntAsString,
      nonce: bigIntAsString,
      totalDifficulty: bigIntAsString,
      baseFeePerGas: bigIntAsString,
      size: bigIntAsString,
      withdrawals: withdrawalSaveSchema.array(),
      transactions: z.union([
        z.string().array(),
        transactionSaveSchema.array(),
      ]),
    }),
  )
  .partial();

export type BlockHeadersSimplifiedSaveType = z.infer<
  typeof blockHeadersSimplifiedSaveSchema
>;
