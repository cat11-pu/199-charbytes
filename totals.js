// totals.js：合计（基线：一律给空表）
import { bytesOf } from "./count.js";
import { scanText } from "./count.js";

export function countAll(texts) {
  const bytes = [];
  const chars = [];
  let total_bytes = 0;
  let total_chars = 0;
  let widest_gap = 0;
  for (const text of texts) {
    if (text === "") {
      const error = new Error("文本不能为空");
      error.code = "E_EMPTY_TEXT";
      throw error;
    }
    const part = scanText(text);
    bytes.push(part.bytes);
    chars.push(part.chars);
    total_bytes += part.bytes;
    total_chars += part.chars;
    widest_gap = Math.max(widest_gap, part.bytes - part.chars);
  }
  return { bytes, chars, total_bytes, total_chars, widest_gap };
}
