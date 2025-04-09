import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  const routes = [
    '/',
    '/customers',
    '/login',
    '/orders',
    '/about'
  ];

  for (const route of routes) {
    test(`Route: ${route} should match snapshot`, async ({ page }) => {
      await page.goto(route);
      // Wait for content to load
      await page.waitForTimeout(1000);
      // Take screenshot
      const screenshot = await page.screenshot();
      await expect(screenshot).toMatchSnapshot(`${route.replace(/\//g, '-') || 'home'}.png`);
    });
  }

  test('Customer card view should match snapshot', async ({ page }) => {
    await page.goto('/customers');
    await page.click('[data-testid="card-view-link"]');
    await page.waitForTimeout(1000);
    const screenshot = await page.screenshot();
    await expect(screenshot).toMatchSnapshot('customers-card-view.png');
  });

  test('Customer list view should match snapshot', async ({ page }) => {
    await page.goto('/customers');
    await page.click('[data-testid="list-view-link"]');
    await page.waitForTimeout(1000);
    const screenshot = await page.screenshot();
    await expect(screenshot).toMatchSnapshot('customers-list-view.png');
  });

  test('Customer map view should match snapshot', async ({ page }) => {
    await page.goto('/customers');
    await page.click('[data-testid="map-view-link"]');
    await page.waitForTimeout(2000); // Extra time for map to load
    const screenshot = await page.screenshot();
    await expect(screenshot).toMatchSnapshot('customers-map-view.png');
  });
});
