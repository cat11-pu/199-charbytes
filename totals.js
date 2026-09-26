// totals.js：合计（基线：一律给空表）
import { bytesOf } from "./count.js";

export function countAll(texts) {
  return { bytes: [], chars: [], total_bytes: 0, total_chars: 0, widest_gap: 0 };
}
