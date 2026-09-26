// count.js：数字节（码小于 128 算一字节，其余算三字节）
export function bytesOf(text) {
  let bytes = 0;
  for (const ch of String(text)) {
    bytes += ch.codePointAt(0) < 128 ? 1 : 3;
  }
  return bytes;
}
