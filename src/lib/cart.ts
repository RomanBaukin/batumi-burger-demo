export type Cart = Record<string, number>;
type PricedItem = { id: string; price: number };
export function restoreCart(raw: string | null, products: PricedItem[]): Cart {
  try {
    const value: unknown = JSON.parse(raw ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value)
        .filter(
          ([id, qty]) =>
            products.some((item) => item.id === id) &&
            typeof qty === "number" &&
            Number.isInteger(qty) &&
            qty > 0,
        )
        .map(([id, qty]) => [id, Math.min(qty as number, 20)]),
    );
  } catch {
    return {};
  }
}
export function updateQuantity(cart: Cart, id: string, delta: number): Cart {
  const next = {
    ...cart,
    [id]: Math.min(20, Math.max(0, (cart[id] ?? 0) + delta)),
  };
  if (!next[id]) delete next[id];
  return next;
}
export function cartTotal(cart: Cart, products: PricedItem[]) {
  return products.reduce(
    (total, product) => total + product.price * (cart[product.id] ?? 0),
    0,
  );
}
