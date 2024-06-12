export type FieldError = {
  property: string;
  message: string;
};

export type FieldErrors = ReadonlyArray<FieldError>;
