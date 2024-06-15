import { BigIntFromString, binIntAsStringShema } from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';

export const validChainsSchema = z.union([
  z.literal('goerli'),
  z.literal('kovan'),
  z.literal('mainnet'),
  z.literal('rinkeby'),
  z.literal('ropsten'),
  z.literal('sepolia'),
]);

export type ValidChains = z.infer<typeof validChainsSchema>;

export const validHardForkSchema = z.union([
  z.literal('chainstart'),
  z.literal('frontier'),
  z.literal('homestead'),
  z.literal('dao'),
  z.literal('tangerineWhistle'),
  z.literal('spuriousDragon'),
  z.literal('byzantium'),
  z.literal('constantinople'),
  z.literal('petersburg'),
  z.literal('istanbul'),
  z.literal('muirGlacier'),
  z.literal('berlin'),
  z.literal('london'),
  z.literal('altair'),
  z.literal('arrowGlacier'),
  z.literal('grayGlacier'),
  z.literal('bellatrix'),
  z.literal('merge'),
  z.literal('capella'),
  z.literal('shanghai'),
]);

export type ValidHardFork = z.infer<typeof validHardForkSchema>;

const customChainSchema = z
  .object({
    name: z.string(),
    networkId: BigIntFromString,
    chainId: BigIntFromString,
  })
  .partial();

const commonSchema = z
  .object({
    customChain: customChainSchema,
    baseChain: validChainsSchema,
    hardfork: validHardForkSchema,
  })
  .partial();

export const accessListSchema = z
  .object({
    address: z.string(),
    storageKeys: z.string().array(),
  })
  .partial();

export const transactionSchema = z
  .object({
    blockHash: z.string(),
    blockNumber: BigIntFromString,
    from: z.string(),
    hash: z.string(),
    transactionIndex: z.string(),
    to: z.string(),
    value: BigIntFromString,
    accessList: accessListSchema.array(),
    common: commonSchema,
    gas: BigIntFromString,
    gasPrice: BigIntFromString,
    type: BigIntFromString,
    maxFeePerGas: BigIntFromString,
    maxPriorityFeePerGas: BigIntFromString,
    data: z.string(),
    input: z.string(),
    chain: z.number(),
    hardfork: validHardForkSchema,
    nonce: BigIntFromString,
    chainId: BigIntFromString,
    gasLimit: BigIntFromString,
    v: BigIntFromString,
    networkId: z.number(),
    yParity: z.number(),
    r: z.string(),
    s: z.string(),
  })
  .partial();

export type Transaction = z.infer<typeof transactionSchema>;

export const withdrawalSchema = z
  .object({
    address: z.string(),
    amount: BigIntFromString,
    index: BigIntFromString,
    validatorIndex: BigIntFromString,
  })
  .partial();

export type Withdrawal = z.infer<typeof withdrawalSchema>;

export const blockHeadersSimplifiedSchema = z
  .object({
    parentBeaconBlockRoot: z.string(),
    blobGasUsed: BigIntFromString,
    excessBlobGas: BigIntFromString,
    parentHash: z.string(),
    sha3Uncles: z.string(),
    miner: z.string(),
    stateRoot: z.string(),
    transactionsRoot: z.string(),
    receiptsRoot: z.string(),
    logsBloom: z.string(),
    difficulty: BigIntFromString,
    number: BigIntFromString,
    gasLimit: BigIntFromString,
    gasUsed: BigIntFromString,
    timestamp: BigIntFromString,
    extraData: z.string(),
    mixHash: z.string(),
    nonce: BigIntFromString,
    totalDifficulty: BigIntFromString,
    baseFeePerGas: BigIntFromString,
    size: BigIntFromString,
    transactions: z.union([z.string().array(), transactionSchema.array()]),
    uncles: z.string().array(),
    hash: z.string(),
    withdrawals: withdrawalSchema.array(),
    withdrawalsRoot: z.string(),
  })
  .partial();

export type BlockHeadersSimplifiedType = z.infer<
  typeof blockHeadersSimplifiedSchema
>;

const customChainSaveSchema = customChainSchema
  .omit({
    networkId: true,
    chainId: true,
  })
  .merge(
    z.object({
      networkId: binIntAsStringShema,
      chainId: binIntAsStringShema,
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
      blockNumber: binIntAsStringShema,
      value: binIntAsStringShema,
      gas: binIntAsStringShema,
      gasPrice: binIntAsStringShema,
      type: binIntAsStringShema,
      maxFeePerGas: binIntAsStringShema,
      maxPriorityFeePerGas: binIntAsStringShema,
      nonce: binIntAsStringShema,
      chainId: binIntAsStringShema,
      gasLimit: binIntAsStringShema,
      v: binIntAsStringShema,
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
      amount: binIntAsStringShema,
      index: binIntAsStringShema,
      validatorIndex: binIntAsStringShema,
    }),
  )
  .partial();

export const blockHeadersSimplifiedSaveSchema = blockHeadersSimplifiedSchema
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
      blobGasUsed: binIntAsStringShema,
      excessBlobGas: binIntAsStringShema,
      difficulty: binIntAsStringShema,
      number: binIntAsStringShema,
      gasLimit: binIntAsStringShema,
      gasUsed: binIntAsStringShema,
      timestamp: binIntAsStringShema,
      nonce: binIntAsStringShema,
      totalDifficulty: binIntAsStringShema,
      baseFeePerGas: binIntAsStringShema,
      size: binIntAsStringShema,
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
