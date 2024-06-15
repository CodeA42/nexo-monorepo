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
