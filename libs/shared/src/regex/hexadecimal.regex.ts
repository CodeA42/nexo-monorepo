export const hexRegex = /^0x[0-9a-fA-F]+$|^[0-9a-fA-F]+$/;

export function hexNRegex(byteLength: number) {
  const hexCharLength = byteLength * 2;
  return new RegExp(`^0x[0-9a-fA-F]{${hexCharLength}}$`);
}
