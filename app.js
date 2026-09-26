// app.js：渲染结果
import { bytesOf } from "./count.js";
import { countAll } from "./totals.js";

export function render(spec) {
  const texts = spec.texts || [];
  const view = countAll(texts);
  const bytes = view.bytes || [];
  const chars = view.chars || [];
  return { bytes: bytes, chars: chars, total_bytes: view.total_bytes || 0,
           total_chars: view.total_chars || 0, widest_gap: view.widest_gap || 0,
           count: bytes.length, gaps_ok: bytes.every((value, spot) => value >= chars[spot]) };
}
