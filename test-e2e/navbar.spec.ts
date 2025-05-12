import { test, expect } from '@playwright/test';
import { navigateTo, login } from './utils/test-utils';

test.describe('Navbar Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to customers page', async ({ page }) => {
    await page.locator('[data-testid="navbar-customers"]').click();
    await page.waitForURL('/customers', { timeout: 5000 });
    await expect(page.url()).toContain('/customers');
  });

  test('should navigate to orders page', async ({ page }) => {
    await page.locator('[data-testid="navbar-orders"]').click();
    await page.waitForURL('/orders', { timeout: 5000 });
    await expect(page.url()).toContain('/orders');
  });

  test('should navigate to about page', async ({ page }) => {
    await page.locator('[data-testid="navbar-about"]').click();
    await page.waitForURL('/about', { timeout: 5000 });
    await expect(page.url()).toContain('/about');
  });

  test('should show login/logout based on auth state', async ({ page }) => {
    await expect(page.locator('[data-testid="navbar-login-logout"]')).toHaveText('Login');
    
    await login(page, 'asdf@asdf.com', '$asdf123$');
    
    await expect(page.locator('[data-testid="navbar-login-logout"]')).toHaveText('Logout');
    
    await page.locator('[data-testid="navbar-login-logout"]').click();
    
    await expect(page.locator('[data-testid="navbar-login-logout"]')).toHaveText('Login');
  });

  test('should display correct brand text', async ({ page }) => {
    await page.goto('/customers');
    await expect(page.locator('[data-testid="navbar-brand"] .app-title')).toHaveText('Customer Manager');
  });
});
