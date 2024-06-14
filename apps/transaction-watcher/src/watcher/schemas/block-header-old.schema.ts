import { isValidZodSchema } from '@nexo-monorepo/shared';
import { Schema } from 'mongoose';
import { transactionSchema as transactionZodSchema } from '@nexo-monorepo/ethereum-shared';

const withdrawalSchema = new Schema({
  address: {
    type: String,
    required: false,
  },
  amount: {
    type: Schema.Types.BigInt,
    required: false,
  },
  index: {
    type: Schema.Types.BigInt,
    required: false,
  },
  validatorIndex: {
    type: Schema.Types.BigInt,
    required: false,
  },
});

export const accessListSchema = new Schema({
  address: {
    type: String,
    required: false,
  },
  storageKeys: {
    type: String,
    required: false,
  },
});

export const customChainSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  networkId: {
    type: Schema.Types.BigInt,
    required: false,
  },
  chainId: {
    type: Schema.Types.BigInt,
    required: false,
  },
});

export const commonSchema = new Schema({
  customChain: {
    type: customChainSchema,
    required: false,
  },
  baseChain: {
    type: String,
    enum: ['goerli', 'kovan', 'mainnet', 'rinkeby', 'ropsten', 'sepolia'],
    required: false,
  },
  hardfork: {
    type: String,
    enum: [
      'chainstart',
      'frontier',
      'homestead',
      'dao',
      'tangerineWhistle',
      'spuriousDragon',
      'byzantium',
      'constantinople',
      'petersburg',
      'istanbul',
      'muirGlacier',
      'berlin',
      'london',
      'altair',
      'arrowGlacier',
      'grayGlacier',
      'bellatrix',
      'merge',
      'capella',
      'shanghai',
    ],
    required: false,
  },
});

export const transactionSchema = new Schema({
  blockHash: {
    type: String,
    required: false,
  },
  blockNumber: {
    type: Schema.Types.BigInt,
    required: false,
  },
  from: {
    type: String,
    required: false,
  },
  hash: {
    type: String,
    required: false,
  },
  transactionIndex: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: false,
  },
  value: {
    type: Schema.Types.BigInt,
    required: false,
  },
  accessList: {
    type: [accessListSchema],
    required: false,
  },
  common: {
    type: commonSchema,
    required: false,
  },
  gas: {
    type: Schema.Types.BigInt,
    required: false,
  },
  gasPrice: {
    type: Schema.Types.BigInt,
    required: false,
  },
  type: {
    type: Schema.Types.BigInt,
    required: false,
  },
  maxFeePerGas: {
    type: Schema.Types.BigInt,
    required: false,
  },
  maxPriorityFeePerGas: {
    type: Schema.Types.BigInt,
    required: false,
  },
  data: {
    type: String,
    required: false,
  },
  input: {
    type: String,
    required: false,
  },
  nonce: {
    type: Schema.Types.BigInt,
    required: false,
  },
  chain: {
    type: Number,
    required: false,
  },
  hardfork: {
    type: String,
    enum: [
      'chainstart',
      'frontier',
      'homestead',
      'dao',
      'tangerineWhistle',
      'spuriousDragon',
      'byzantium',
      'constantinople',
      'petersburg',
      'istanbul',
      'muirGlacier',
      'berlin',
      'london',
      'altair',
      'arrowGlacier',
      'grayGlacier',
      'bellatrix',
      'merge',
      'capella',
      'shanghai',
    ],
    required: false,
  },
  chainId: {
    type: Schema.Types.BigInt,
    required: false,
  },
  networkId: {
    type: Number,
    required: false,
  },
  gasLimit: {
    type: Schema.Types.BigInt,
    required: false,
  },
  yParity: {
    type: Number,
    required: false,
  },
  v: {
    type: Schema.Types.BigInt,
    required: false,
  },
  r: {
    type: String,
    required: false,
  },
  s: {
    type: String,
    required: false,
  },
});

export const blockHeaderSchema = new Schema({
  parentBeaconBlockRoot: {
    type: String,
    required: false,
  },
  blobGasUsed: {
    type: Schema.Types.BigInt,
    required: false,
  },
  excessBlobGas: {
    type: Schema.Types.BigInt,
    required: false,
  },
  parentHash: {
    type: String,
    required: false,
  },
  sha3Uncles: {
    type: String,
    required: false,
  },
  miner: {
    type: String,
    required: false,
  },
  stateRoot: {
    type: String,
    required: false,
  },
  transactionsRoot: {
    type: String,
    required: false,
  },
  receiptsRoot: {
    type: String,
    required: false,
  },
  logsBloom: {
    type: String,
    required: false,
  },
  difficulty: {
    type: Schema.Types.BigInt,
    required: false,
  },
  number: {
    type: Schema.Types.BigInt,
    required: false,
  },
  gasLimit: {
    type: Schema.Types.BigInt,
    required: false,
  },
  gasUsed: {
    type: Schema.Types.BigInt,
    required: false,
  },
  timestamp: {
    type: Schema.Types.BigInt,
    required: false,
  },
  extraData: {
    type: String,
    required: false,
  },
  mixHash: {
    type: String,
    required: false,
  },
  nonce: {
    type: Schema.Types.BigInt,
    required: false,
  },
  totalDifficulty: {
    type: Schema.Types.BigInt,
    required: false,
  },
  baseFeePerGas: {
    type: Schema.Types.BigInt,
    required: false,
  },
  size: {
    type: Schema.Types.BigInt,
    required: false,
  },
  transactions: {
    type: [Schema.Types.Mixed],
    required: false,
    validate: {
      validator: function (value: unknown[]) {
        return value.every((v) => typeof v === 'string' || isValidZodSchema(v, transactionZodSchema));
      },
      message: 'Transactions must be either strings or transaction objects',
    },
  },
  uncles: {
    type: [String],
    required: false,
  },
  hash: {
    type: String,
    required: false,
  },
  withdrawals: {
    type: [withdrawalSchema],
    required: false,
  },
  withdrawalsRoot: {
    type: String,
    required: false,
  },
});
