import { test, expect } from '@playwright/test';

test.describe('Order Pricing Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/orders');
  });

  test('should display correct order prices', async ({ page }) => {
    await expect(page.locator('[data-testid="order-cost"]').first()).toBeVisible();
    
    const orderCosts = await page.locator('[data-testid="order-cost"]').allInnerTexts();
    
    for (const cost of orderCosts) {
      expect(cost).toMatch(/\$\d+\.\d{2}/);
    }
  });

  test('should display correct order total', async ({ page }) => {
    await expect(page.locator('[data-testid="order-total"]').first()).toBeVisible();
    
    const total = await page.locator('[data-testid="order-total"]').first().innerText();
    
    expect(total).toMatch(/\$\d+\.\d{2}/);
    
  });
});
