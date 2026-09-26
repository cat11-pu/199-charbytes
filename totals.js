// totals.js：合计（一次扫描，每字符只判一次）
export function countAll(texts) {
  const bytes = [];
  const chars = [];
  let total_bytes = 0;
  let total_chars = 0;
  let widest_gap = 0;
  for (const item of texts) {
    const text = String(item);
    if (text.length === 0) {
      const error = new Error("E_EMPTY_TEXT: 文本不能为空");
      error.code = "E_EMPTY_TEXT";
      throw error;
    }
    let textBytes = 0;
    let textChars = 0;
    for (const ch of text) {
      textBytes += ch.codePointAt(0) < 128 ? 1 : 3;
      textChars += 1;
    }
    bytes.push(textBytes);
    chars.push(textChars);
    total_bytes += textBytes;
    total_chars += textChars;
    const gap = textBytes - textChars;
    if (gap > widest_gap) widest_gap = gap;
  }
  return { bytes, chars, total_bytes, total_chars, widest_gap };
}
