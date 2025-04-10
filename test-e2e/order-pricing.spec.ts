import { test, expect } from '@playwright/test';
import { login } from './utils/test-utils';

test.describe('Order Pricing Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'asdf@asdf.com', '$asdf123$');
    await page.goto('/orders');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Additional wait for page to fully load
  });

  test('should display correct order prices', async ({ page }) => {
    test.skip(true, 'Order pricing test needs to be fixed');
    
    await page.waitForSelector('[data-testid="order-cost"]', { state: 'visible', timeout: 15000 });
    await expect(page.locator('[data-testid="order-cost"]').first()).toBeVisible();

    const orderCosts = await page.locator('[data-testid="order-cost"]').allInnerTexts();

    for (const cost of orderCosts) {
      expect(cost).toMatch(/\$\d+\.\d{2}/);
    }
  });

  test('should display correct order total', async ({ page }) => {
    test.skip(true, 'Order total test needs to be fixed');

    await page.waitForSelector('[data-testid="order-total"]', { state: 'visible', timeout: 15000 });
    await expect(page.locator('[data-testid="order-total"]').first()).toBeVisible();

    const total = await page.locator('[data-testid="order-total"]').first().innerText();

    expect(total).toMatch(/\$\d+\.\d{2}/);
  });
});
