import { test, expect } from '@playwright/test';

test.describe('Login Page Visual Regression Tests', () => {
  test('should match visual snapshot of login page', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('[data-testid="login-form"]', { state: 'visible' });
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('should match visual snapshot of login validation errors', async ({ page }) => {
    await page.goto('/login');
    
    await page.locator('[data-testid="login-email"]').clear();
    await page.locator('[data-testid="login-password"]').clear();
    
    await page.locator('[data-testid="login-email"]').fill('invalid-email');
    await page.locator('[data-testid="login-email"]').blur();
    await page.locator('[data-testid="login-password"]').fill('123');
    await page.locator('[data-testid="login-password"]').blur();
    
    await page.waitForSelector('[data-testid="login-email-error"]', { state: 'visible' });
    await page.waitForSelector('[data-testid="login-password-error"]', { state: 'visible' });
    
    await expect(page).toHaveScreenshot('login-page-with-errors.png');
  });
});
