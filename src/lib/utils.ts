import LZString from "lz-string";

// Utility to encode data to a compressed, URL-safe string
export function encodeData(data: any): string {
  const str = JSON.stringify(data);
  return LZString.compressToEncodedURIComponent(str);
}

// Utility to decode data from a compressed, URL-safe string
export function decodeData(encoded: string): any {
  const decoded = LZString.decompressFromEncodedURIComponent(encoded);
  if (!decoded) return null;
  return JSON.parse(decoded);
}
