import { z } from 'zod';

export type PaginationMeta = z.infer<typeof paginationMetaSchema>;

export const paginationMetaSchema = z.object({
  currentPage: z.number(),
  totalItems: z.number(),
  itemCount: z.number(),
  itemsPerPage: z.number(),
  totalPages: z.number(),
});

export function createPaginatedResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType,
) {
  return z.object({
    items: z.array(itemSchema),
    meta: paginationMetaSchema,
  });
}

export function createPaginatedResponseWithAdditionalMetaSchema<
  ItemType extends z.ZodTypeAny,
  MetaType extends Record<string, z.ZodTypeAny>,
>(itemSchema: ItemType, additionalMeta: MetaType) {
  return z.object({
    items: z.array(itemSchema),
    meta: z.object({
      pagination: paginationMetaSchema,
      ...additionalMeta,
    }),
  });
}
