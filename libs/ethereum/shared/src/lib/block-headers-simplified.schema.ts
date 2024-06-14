import { BigIntFromString } from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';

export const validChainsSchema = z.union([
  z.literal('goerli'),
  z.literal('kovan'),
  z.literal('mainnet'),
  z.literal('rinkeby'),
  z.literal('ropsten'),
  z.literal('sepolia'),
]);

validChainsSchema;

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

export const transactionSchema = z.object({
  blockHash: z.string().optional(),
  blockNumber: BigIntFromString.optional(),
  from: z.string().optional(),
  hash: z.string().optional(),
  transactionIndex: z.string().optional(),
  to: z.string().optional(),
  value: BigIntFromString.optional(),
  accessList: z
    .object({
      address: z.string().optional(),
      storageKeys: z.string().array().optional(),
    })
    .array()
    .optional(),
  common: z
    .object({
      customChain: z.object({
        name: z.string().optional(),
        networkId: BigIntFromString,
        chainId: BigIntFromString,
      }),
      baseChain: validChainsSchema.optional(),
      hardfork: validHardForkSchema.optional(),
    })
    .optional(),
  gas: BigIntFromString.optional(),
  gasPrice: BigIntFromString.optional(),
  type: BigIntFromString.optional(),
  maxFeePerGas: BigIntFromString.optional(),
  maxPriorityFeePerGas: BigIntFromString.optional(),
  data: z.string().optional(),
  input: z.string().optional(),
  nonce: BigIntFromString.optional(),
  chain: z.number().optional(),
  hardfork: validHardForkSchema.optional(),
  chainId: BigIntFromString.optional(),
  networkId: z.number().optional(),
  gasLimit: BigIntFromString.optional(),
  yParity: z.number().optional(),
  v: BigIntFromString.optional(),
  r: z.string().optional(),
  s: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const withdrawalSchema = z.object({
  address: z.string().optional(),
  amount: BigIntFromString.optional(),
  index: BigIntFromString.optional(),
  validatorIndex: BigIntFromString.optional(),
});

export type Withdrawal = z.infer<typeof withdrawalSchema>;

export const blockHeadersSimplifiedSchema = z.object({
  parentBeaconBlockRoot: z.string().optional(),
  blobGasUsed: BigIntFromString.optional(),
  excessBlobGas: BigIntFromString.optional(),
  parentHash: z.string().optional(),
  sha3Uncles: z.string().optional(),
  miner: z.string().optional(),
  stateRoot: z.string().optional(),
  transactionsRoot: z.string().optional(),
  receiptsRoot: z.string().optional(),
  logsBloom: z.string().optional(),
  difficulty: BigIntFromString.optional(),
  number: BigIntFromString.optional(),
  gasLimit: BigIntFromString.optional(),
  gasUsed: BigIntFromString.optional(),
  timestamp: BigIntFromString.optional(),
  extraData: z.string().optional(),
  mixHash: z.string().optional(),
  nonce: BigIntFromString.optional(),
  totalDifficulty: BigIntFromString.optional(),
  baseFeePerGas: BigIntFromString.optional(),
  size: BigIntFromString.optional(),
  transactions: z
    .union([z.string().array(), transactionSchema.array()])
    .optional(),
  uncles: z.string().array().optional(),
  hash: z.string().optional(),
  withdrawals: withdrawalSchema.array().optional(),
  withdrawalsRoot: z.string().optional(),
});

export type BlockHeadersSimplifiedType = z.infer<
  typeof blockHeadersSimplifiedSchema
>;
