// Utility to encode a string to URL-safe Base64 (Unicode-safe)
export function encodeData(data: any): string {
  const str = JSON.stringify(data);
  // Encode to UTF-8 bytes, then to Base64
  const bytes = new TextEncoder().encode(str);
  const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  const base64 = btoa(binString);
  
  // Make it URL-safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Utility to decode from URL-safe Base64 (Unicode-safe)
export function decodeData(encoded: string): any {
  // Add back padding if necessary
  let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
  const str = new TextDecoder().decode(bytes);
  
  return JSON.parse(str);
}
