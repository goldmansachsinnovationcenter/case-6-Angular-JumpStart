import { test, expect } from '@playwright/test';
import { navigateTo, login } from './utils/test-utils';

test.describe('Overlay Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'test@test.com', 'password1');
    await page.goto('/customers');
    await page.waitForLoadState('networkidle');
  });

  test('should display overlay during HTTP requests', async ({ page }) => {
    await page.locator('[data-testid="navbar-orders"]').click();
    
    await expect(page.locator('[data-testid="overlay-container"]')).toBeVisible();
    
    await page.waitForURL('/orders', { timeout: 5000 });
    
    await expect(page.locator('[data-testid="overlay-container"]')).not.toBeVisible();
  });

  test('should show and hide overlay when filtering customers', async ({ page }) => {
    await page.locator('input[placeholder="Filter Customers"]').click();
    
    await page.locator('input[placeholder="Filter Customers"]').fill('john');
    
    await expect(page.locator('[data-testid="overlay-container"]')).toBeVisible();
    
    await page.waitForTimeout(1000);
    
    await expect(page.locator('[data-testid="overlay-container"]')).not.toBeVisible();
  });

  test('should have correct overlay structure', async ({ page }) => {
    await page.locator('[data-testid="navbar-orders"]').click();
    
    await expect(page.locator('[data-testid="overlay-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="overlay-background"]')).toBeVisible();
    await expect(page.locator('[data-testid="overlay-content"]')).toBeVisible();
  });
});
