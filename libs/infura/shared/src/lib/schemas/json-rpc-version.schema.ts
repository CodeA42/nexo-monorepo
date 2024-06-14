import { z } from 'nestjs-zod/z';

export const infuraJsonRpcVersionSchema = z.literal('2.0');

export type InfuraJsonRpcVersion = z.infer<typeof infuraJsonRpcVersionSchema>;
