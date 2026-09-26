import assert from "node:assert";
import { bytesOf } from "../count.js";
import { countAll } from "../totals.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("bytesOf returns a number", () => {
  assert.strictEqual(typeof bytesOf("abc"), "number");
});

check("countAll returns bytes list", () => {
  assert.ok(Array.isArray(countAll(["abc"]).bytes));
});

check("countAll returns total bytes", () => {
  assert.strictEqual(typeof countAll(["abc"]).total_bytes, "number");
});

check("render counts texts", () => {
  assert.strictEqual(typeof render({ texts: ["abc"] }).count, "number");
});

check("render exposes gaps flag", () => {
  assert.strictEqual(typeof render({ texts: ["abc"] }).gaps_ok, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
