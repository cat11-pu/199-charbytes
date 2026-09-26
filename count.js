// count.js：数字节（基线：一律按字符数算）
export function bytesOf(text) {
  return scanText(text).bytes;
}

// 一次扫描同时得出字节数与字符数，每个字符只判一次：
// 码点小于 128 算 1 字节，其余算 3 字节；字符数按码点个数算。
export function scanText(text) {
  const source = String(text);
  let bytes = 0;
  let chars = 0;
  for (const point of source) {
    chars += 1;
    bytes += point.codePointAt(0) < 128 ? 1 : 3;
  }
  return { bytes: bytes, chars: chars };
}
