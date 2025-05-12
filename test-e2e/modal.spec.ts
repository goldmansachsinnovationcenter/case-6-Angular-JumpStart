import { test, expect } from '@playwright/test';
import { navigateTo, login } from './utils/test-utils';

test.describe('Modal Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'test@test.com', 'password1');
    await page.goto('/customers');
    await page.waitForLoadState('networkidle');
  });

  test('should display modal when deleting a customer', async ({ page }) => {
    await page.locator('.card-container').first().hover();
    await page.locator('.card-container').first().locator('.btn-danger').click();
    
    await expect(page.locator('[data-testid="modal-container"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal-body"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal-cancel"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal-ok"]')).toBeVisible();
  });

  test('should close modal when clicking cancel button', async ({ page }) => {
    await page.locator('.card-container').first().hover();
    await page.locator('.card-container').first().locator('.btn-danger').click();
    
    await expect(page.locator('[data-testid="modal-container"]')).toBeVisible();
    
    await page.locator('[data-testid="modal-cancel"]').click();
    
    await expect(page.locator('[data-testid="modal-container"]')).not.toBeVisible();
    
    await expect(page.locator('.card-container').first()).toBeVisible();
  });

  test('should close modal and perform action when clicking OK button', async ({ page }) => {
    const initialCustomerCount = await page.locator('.card-container').count();
    
    await page.locator('.card-container').first().hover();
    await page.locator('.card-container').first().locator('.btn-danger').click();
    
    await expect(page.locator('[data-testid="modal-container"]')).toBeVisible();
    
    await page.locator('[data-testid="modal-ok"]').click();
    
    await expect(page.locator('[data-testid="modal-container"]')).not.toBeVisible();
    
    await page.waitForTimeout(1000); // Wait for deletion to complete
    const finalCustomerCount = await page.locator('.card-container').count();
    expect(finalCustomerCount).toBeLessThan(initialCustomerCount);
  });
});
