import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("Startseite laedt", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=AION 2")).toBeVisible();
  });

  test("Navigation zu /klassen/", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/klassen/"]');
    await expect(page).toHaveURL(/\/klassen\//);
    await expect(page.locator("text=Klassen")).toBeVisible();
  });

  test("Navigation zu /klassenfinder/", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/klassenfinder/"]');
    await expect(page).toHaveURL(/\/klassenfinder\//);
    await expect(page.locator("text=Klassenfinder")).toBeVisible();
  });

  test("Direkter Aufruf /klassen/templar/", async ({ page }) => {
    await page.goto("/klassen/templar/");
    await expect(page.locator("text=Templer")).toBeVisible();
  });

  test("Direkter Aufruf /builds/", async ({ page }) => {
    await page.goto("/builds/");
    await expect(page.locator("text=Builds")).toBeVisible();
  });

  test("Direkter Aufruf /korea-server/", async ({ page }) => {
    await page.goto("/korea-server/");
    await expect(page.locator("text=Koreanische")).toBeVisible();
  });

  test("Direkter Aufruf /impressum/", async ({ page }) => {
    await page.goto("/impressum/");
    await expect(page.locator("text=Impressum")).toBeVisible();
  });

  test("Direkter Aufruf /datenschutz/", async ({ page }) => {
    await page.goto("/datenschutz/");
    await expect(page.locator("text=Datenschutz")).toBeVisible();
  });

  test("Direkter Aufruf /ausruestung/", async ({ page }) => {
    await page.goto("/ausruestung/");
    await expect(page.locator("text=Ausr\u00fcstung")).toBeVisible();
    await expect(page.locator("text=Research-Entwurf")).toBeVisible();
  });

  test("Direkter Aufruf /ausruestung/leveling/", async ({ page }) => {
    await page.goto("/ausruestung/leveling/");
    await expect(page.locator("text=Leveling-Ausr\u00fcstung")).toBeVisible();
    await expect(page.locator("text=nicht final")).toBeVisible();
  });

  test("Ausruestungs-Route ohne Umlaut funktioniert", async ({ page }) => {
    await page.goto("/ausruestung/");
    await expect(page).toHaveURL(/\/ausruestung\//);
  });

  test("unbekannte Route zeigt 404", async ({ page }) => {
    await page.goto("/nicht-existierend/");
    await expect(page.locator("text=404")).toBeVisible();
  });
});

test.describe("Klassenfinder", () => {
  test("Klassenfinder kann abgeschlossen werden", async ({ page }) => {
    await page.goto("/klassenfinder/");

    for (let i = 0; i < 7; i++) {
      await expect(page.locator("text=Weiter")).toBeVisible();
      await page.locator("[data-testid='option-0']").click();
      await page.click("text=Weiter");
    }

    await expect(page.locator("text=Ergebnis")).toBeVisible();
  });

  test("Ergebnis zeigt drei Klassen", async ({ page }) => {
    await page.goto("/klassenfinder/");

    for (let i = 0; i < 7; i++) {
      await page.locator("[data-testid='option-0']").click();
      await page.click("text=Weiter");
    }

    const resultCards = await page.locator("[data-testid='result-card']").count();
    expect(resultCards).toBe(3);
  });
});

test.describe("Mobile Viewport", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("kein horizontaler Overflow bei 390x844", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(overflow).toBe(false);
  });

  test("Mobile Navigation funktioniert", async ({ page }) => {
    await page.goto("/");
    await page.click("[data-testid='mobile-menu-button']");
    await expect(page.locator("text=Klassen")).toBeVisible();
    await page.click('a[href="/klassen/"]');
    await expect(page).toHaveURL(/\/klassen\//);
  });
});
