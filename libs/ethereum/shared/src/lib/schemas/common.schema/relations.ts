import { z } from 'nestjs-zod/z';
import {
  customChainBigIntAsStringSchema,
  customChainBigIntFromStringSchema,
  customChainBigIntToStringSchema,
  customChainSchema,
} from '../custom-chain.schema';
import { validChainsSchema } from '../valid-chains.schema';
import { validHardForkSchema } from '../valid-hard-fork.schema';

const baseRelations = z.object({
  baseChain: validChainsSchema,
  hardfork: validHardForkSchema,
});

export const relationsSchema = baseRelations.merge(
  z.object({
    customChain: customChainSchema,
  }),
);

export const relationsBigIntFromStringSchema = baseRelations.merge(
  z.object({
    customChain: customChainBigIntFromStringSchema,
  }),
);

export const relationsBigIntAsStringSchema = baseRelations.merge(
  z.object({
    customChain: customChainBigIntAsStringSchema,
  }),
);

export const relationsBigIntToStringSchema = baseRelations.merge(
  z.object({
    customChain: customChainBigIntToStringSchema,
  }),
);
