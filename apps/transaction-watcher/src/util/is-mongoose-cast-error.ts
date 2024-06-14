import { CastError } from 'mongoose';

export function isMongooseCastError(error: unknown): error is CastError {
  return typeof error === 'object' && error !== null && 'name' in error && error.name === 'CastError';
}
