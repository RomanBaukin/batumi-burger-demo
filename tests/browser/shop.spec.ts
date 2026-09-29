import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("cart persists, recalculates, removes products and completes demo checkout", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Добавить Тот самый", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Добавить Двойной ЖАР", exact: true })
    .click();
  await page.reload();
  await page
    .getByRole("button", { name: "Открыть корзину, товаров: 2", exact: true })
    .click();
  await expect(page.getByTestId("cart-total")).toHaveText("44 ₾");
  await page.getByRole("button", { name: "Увеличить Тот самый" }).click();
  await expect(page.getByTestId("cart-total")).toHaveText("63 ₾");
  await page.getByRole("button", { name: "Уменьшить Тот самый" }).click();
  await page.getByRole("button", { name: "Удалить Двойной ЖАР" }).click();
  await expect(page.getByTestId("cart-total")).toHaveText("19 ₾");
  await page.getByRole("button", { name: "Оформить демозаказ" }).click();
  await expect(page.getByText("Демозаказ собран!")).toBeVisible();
  await page.getByRole("button", { name: "Вернуться к меню" }).click();
  await page.reload();
  await page
    .getByRole("button", { name: "Открыть корзину, товаров: 0" })
    .click();
  await expect(page.getByText("Пока без бургера?")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("all menu categories work and malformed storage does not break the page", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("zhar-cart-v1", "broken-json"),
  );
  await page.goto("/");
  await expect(page.locator(".product")).toHaveCount(6);
  await expect
    .poll(async () =>
      page
        .locator(".product-visual img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await page.getByRole("button", { name: "Закуски" }).click();
  await expect(page.locator(".product")).toHaveCount(3);
  await expect
    .poll(async () =>
      page
        .locator(".product-visual img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await page
    .getByRole("button", { name: "Добавить Картофель фри", exact: true })
    .click();
  await page.getByRole("button", { name: "Напитки" }).click();
  await expect(page.locator(".product")).toHaveCount(3);
  await expect
    .poll(async () =>
      page
        .locator(".product-visual img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await page
    .getByRole("button", { name: "Добавить Кола", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Открыть корзину, товаров: 2" })
    .click();
  await expect(page.getByTestId("cart-total")).toHaveText("12 ₾");
});

test("mobile menu, FAQ, images, reduced motion and responsive layout", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Открыть меню", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Наш подход" })
    .click();
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await page
    .locator("summary")
    .filter({ hasText: "Это настоящая бургерная?" })
    .click();
  await expect(page.getByText(/Пока только в нашем воображении/)).toBeVisible();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "artifacts/desktop.png", fullPage: true });
  await page.screenshot({ path: "artifacts/desktop-hero.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "artifacts/mobile.png", fullPage: true });
  await page.screenshot({ path: "artifacts/mobile-hero.png" });
  await expect(page.locator(".hero-image")).toBeVisible();
  expect(
    await page
      .locator(".hero-image")
      .evaluate(
        (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
      ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("page and cart have no automated WCAG A/AA violations and dialog traps focus", async ({
  page,
}) => {
  await page.goto("/");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page
    .getByRole("button", { name: "Открыть корзину, товаров: 0" })
    .click();
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() =>
      document.querySelector("dialog")?.contains(document.activeElement),
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Открыть корзину, товаров: 0" }),
  ).toBeFocused();
});
