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
  blockNumber: z.bigint().optional(),
  from: z.string().optional(),
  hash: z.string().optional(),
  transactionIndex: z.string().optional(),
  to: z.string().optional(),
  value: z.bigint().optional(),
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
  data: z.string().optional(),
  input: z.string().optional(),
  nonce: z.bigint().optional(),
  chain: z.number().optional(),
  hardfork: validHardForkSchema.optional(),
  chainId: z.bigint().optional(),
  networkId: z.number().optional(),
  gasLimit: z.bigint().optional(),
  yParity: z.number().optional(),
  v: z.bigint().optional(),
  r: z.string().optional(),
  s: z.string().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const withdrawalSchema = z.object({
  address: z.string().optional(),
  amount: z.bigint().optional(),
  index: z.bigint().optional(),
  validatorIndex: z.bigint().optional(),
});

export type Withdrawal = z.infer<typeof withdrawalSchema>;

export const blockHeadersSimplifiedSchema = z.object({
  parentBeaconBlockRoot: z.string().optional(),
  blobGasUsed: z.bigint().optional(),
  excessBlobGas: z.bigint(),
  parentHash: z.string().optional(),
  sha3Uncles: z.string().optional(),
  miner: z.string().optional(),
  stateRoot: z.string().optional(),
  transactionsRoot: z.string().optional(),
  receiptsRoot: z.string().optional(),
  logsBloom: z.string().optional(),
  difficulty: z.bigint(),
  number: z.bigint(),
  gasLimit: z.bigint(),
  gasUsed: z.bigint(),
  timestamp: z.bigint(),
  extraData: z.string().optional(),
  mixHash: z.string().optional(),
  nonce: z.bigint().optional(),
  totalDifficulty: z.bigint().optional(),
  baseFeePerGas: z.bigint().optional(),
  size: z.bigint().optional(),
  transactions: z
    .union([z.string().array(), transactionSchema.array()])
    .optional(),
  uncles: z.string().array().optional(),
  hash: z.string().optional(),
  withdrawals: withdrawalSchema.array(),
  withdrawalsRoot: z.string().optional(),
});

export type BlockHeadersSimplifiedType = z.infer<
  typeof blockHeadersSimplifiedSchema
>;
