import { test, expect } from '@playwright/test';
import { login } from '../test-e2e/utils/test-utils';

test.describe('Modal Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'test@test.com', 'password1');
    await page.goto('/customers');
    await page.waitForLoadState('networkidle');
  });

  test('should match visual snapshot of modal dialog', async ({ page }) => {
    await page.locator('.card-container').first().hover();
    await page.locator('.card-container').first().locator('.btn-danger').click();
    
    await page.waitForSelector('[data-testid="modal-container"]', { state: 'visible' });
    await page.waitForSelector('[data-testid="modal-title"]', { state: 'visible' });
    
    await expect(page).toHaveScreenshot('modal-dialog.png');
  });
});
