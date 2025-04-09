import { test, expect } from '@playwright/test';
import { navigateTo } from './utils/test-utils';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate between routes', async ({ page }) => {
    test.skip(true, 'Navigation test needs to be fixed');
    
    await expect(page).toHaveURL('/customers');
    
    await navigateTo(page, 'orders');
    await expect(page).toHaveURL('/orders');
    
    await navigateTo(page, 'about');
    await expect(page).toHaveURL('/about');
    
    await navigateTo(page, 'customers');
    await expect(page).toHaveURL('/customers');
    
    await page.locator('[data-testid="navbar-login-logout"]').click();
    await expect(page).toHaveURL('/login');
  });

  test('should have active navigation item highlighted', async ({ page }) => {
    await expect(page.locator('li.active a[data-testid="navbar-customers"]')).toBeVisible();
    
    await navigateTo(page, 'orders');
    await expect(page.locator('li.active a[data-testid="navbar-orders"]')).toBeVisible();
    
    await navigateTo(page, 'about');
    await expect(page.locator('li.active a[data-testid="navbar-about"]')).toBeVisible();
  });
});
