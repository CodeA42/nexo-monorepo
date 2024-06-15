import { z } from 'nestjs-zod/z';

export const binIntAsStringShema = z.string().refine(
  (value) => {
    try {
      BigInt(value);
      return true;
    } catch (error) {
      return false;
    }
  },
  {
    message: 'Invalid BigInt representation',
  },
);
