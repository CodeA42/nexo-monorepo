import { HttpStatus } from '@nestjs/common';
import {
  FieldErrors,
  ErrorResponse,
  FieldError,
  ErrorResponseItem,
} from '@nexo-monorepo/json-api-standard-shared';

export function toJsonApiErrorResponseDto(
  fieldErrors: FieldErrors,
): ErrorResponse {
  return {
    errors: fieldErrors.map(toValidationErrorToErrorResponseItemDto),
    meta: {},
  };
}

function toValidationErrorToErrorResponseItemDto({
  property,
  message,
}: FieldError): ErrorResponseItem {
  return {
    code: 'validation-error',
    title: 'Validation error',
    detail: createDetailText(property),
    meta: {
      property: property,
      message,
    },
    status: HttpStatus.BAD_REQUEST,
  };
}

function createDetailText(property: FieldError['property']) {
  return `Property: ${property}`;
}
