import Web3 from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';

export type BlockHeaders = Awaited<
  ReturnType<Web3<RegisteredSubscription>['eth']['getBlock']>
>;
