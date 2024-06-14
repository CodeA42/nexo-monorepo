import { hexSchema } from '@nexo-monorepo/shared';
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
  blockHash: hexSchema.optional(),
  blockNumber: z.bigint().optional(),
  from: z.string().optional(),
  hash: hexSchema.optional(),
  transactionIndex: z.string().optional(),
  to: hexSchema.optional(),
  value: z.bigint().optional(),
  accessList: z
    .object({
      address: hexSchema.optional(),
      storageKeys: hexSchema.array().optional(),
    })
    .array()
    .optional(),
  common: z
    .object({
      customChain: z.object({
        name: z.string().optional(),
        networkId: z.bigint(),
        chainId: z.bigint(),
      }),
      baseChain: validChainsSchema.optional(),
      hardfork: validHardForkSchema.optional(),
    })
    .optional(),
  gas: z.bigint().optional(),
  gasPrice: z.bigint().optional(),
  type: z.bigint().optional(),
  maxFeePerGas: z.bigint().optional(),
  maxPriorityFeePerGas: z.bigint().optional(),
  data: hexSchema.optional(),
  input: hexSchema.optional(),
  nonce: z.bigint().optional(),
  chain: z.number().optional(),
  hardfork: validHardForkSchema.optional(),
  chainId: z.bigint().optional(),
  networkId: z.number().optional(),
  gasLimit: z.bigint().optional(),
  yParity: z.number().optional(),
  v: z.bigint().optional(),
  r: hexSchema.optional(),
  s: hexSchema.optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const withdrawalSchema = z.object({
  address: hexSchema,
  amount: z.bigint(),
  index: z.bigint(),
  validatorIndex: z.bigint(),
});

export type Withdrawal = z.infer<typeof withdrawalSchema>;

export const blockHeadersSchema = z.object({
  parentBeaconBlockRoot: hexSchema.optional(),
  blobGasUsed: z.bigint().optional(),
  excessBlobGas: z.bigint(),
  parentHash: hexSchema.optional(),
  sha3Uncles: hexSchema,
  miner: hexSchema,
  stateRoot: hexSchema,
  transactionsRoot: hexSchema,
  receiptsRoot: hexSchema,
  logsBloom: hexSchema,
  difficulty: z.bigint(),
  number: z.bigint(),
  gasLimit: z.bigint(),
  gasUsed: z.bigint(),
  timestamp: z.bigint(),
  extraData: hexSchema,
  mixHash: hexSchema,
  nonce: z.bigint(),
  totalDifficulty: z.bigint(),
  baseFeePerGas: z.bigint(),
  size: z.bigint(),
  transactions: z.union([z.string().array(), transactionSchema.array()]),
  uncles: z.string().array(),
  hash: hexSchema.optional(),
  withdrawals: withdrawalSchema.array(),
  withdrawalsRoot: hexSchema,
});

export type BlockHeadersType = z.infer<typeof blockHeadersSchema>;
