import test from "node:test";
import assert from "node:assert/strict";
import { restoreCart, updateQuantity, cartTotal } from "../src/lib/cart.ts";

const items = [
  { id: "classic", price: 19 },
  { id: "double", price: 25 },
];
test("restores only known products with bounded integer quantities", () => {
  assert.deepEqual(
    restoreCart('{"classic":2,"unknown":4,"double":-1}', items),
    { classic: 2 },
  );
  assert.deepEqual(restoreCart("invalid", items), {});
  assert.deepEqual(restoreCart("null", items), {});
  assert.deepEqual(restoreCart('{"classic":1.5,"double":100}', items), {
    double: 20,
  });
});
test("quantity changes remove zero items and respect the upper limit", () => {
  assert.deepEqual(updateQuantity({ classic: 1 }, "classic", -1), {});
  assert.deepEqual(updateQuantity({ classic: 20 }, "classic", 1), {
    classic: 20,
  });
});
test("totals use catalogue prices and ignore unknown ids", () => {
  assert.equal(cartTotal({ classic: 2, double: 1, unknown: 9 }, items), 63);
});
