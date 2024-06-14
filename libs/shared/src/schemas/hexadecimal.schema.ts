import { z } from 'nestjs-zod/z';
import { hexNRegex, hexRegex } from '../regex/hexadecimal.regex';

export const hexSchema = z.string().refine((value) => hexRegex.test(value), {
  message: 'Invalid hexadecimal number',
});

export function hexNSchema(byteLength: number) {
  return z.string().refine((value) => hexNRegex(byteLength).test(value), {
    message: `Invalid ${byteLength} byte hexadecimal number`,
  });
}
