import { test, expect } from '@playwright/test';
import { login } from './utils/test-utils';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
  });

  test('should display login form', async ({ page }) => {
    await page.waitForSelector('[data-testid="login-form"]', { state: 'visible', timeout: 10000 });
    
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-email"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-password"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-submit"]')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.waitForSelector('[data-testid="login-email"]', { state: 'visible', timeout: 10000 });
    
    await page.locator('[data-testid="login-email"]').click();
    await page.locator('[data-testid="login-password"]').click(); // click away
    await expect(page.locator('[data-testid="login-email-error"]')).toBeVisible();
    
    await page.locator('[data-testid="login-email"]').fill('invalid');
    await expect(page.locator('[data-testid="login-email-error"]')).toBeVisible();
    
    await page.locator('[data-testid="login-password"]').click();
    await page.locator('[data-testid="login-email"]').click(); // click away
    await expect(page.locator('[data-testid="login-password-error"]')).toBeVisible();
    
    await page.locator('[data-testid="login-password"]').fill('12345');
    await expect(page.locator('[data-testid="login-password-error"]')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    // test.skip(true, 'Login functionality needs to be fixed');
    
    await page.waitForSelector('[data-testid="login-form"]', { state: 'visible' });
    await login(page, 'asdf@asdf.com', '$asdf123$');
    
    await expect(page).toHaveURL('/customers');
    
    await expect(page.locator('[data-testid="navbar-login-logout"]')).toContainText('Logout');
  });
});
