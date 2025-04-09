import { test, expect } from '@playwright/test';
import { changeCustomerViewMode, login } from './utils/test-utils';

test.describe('Customer Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/customers');
    await page.waitForLoadState('networkidle');
    
    try {
      if (await page.locator('.login-form').isVisible()) {
        await login(page, 'asdf@asdf.com', '$asdf123$');
      }
    } catch (error) {
      console.log('No login form found, assuming already logged in');
    }
    
    if (!page.url().includes('/customers')) {
      await page.goto('/customers');
      await page.waitForLoadState('networkidle');
    }
  });

  test('should switch between card and list views', async ({ page }) => {
    await page.waitForSelector('[data-testid="customers-card"]', { state: 'visible', timeout: 20000 });
    
    try {
      await page.waitForSelector('[data-testid="view-card"]', { state: 'visible', timeout: 20000 });
      await expect(page.locator('[data-testid="view-card"]')).toHaveClass(/active/);
      
      await page.locator('[data-testid="view-grid"]').click();
      await page.waitForTimeout(2000); // Wait longer for view change
      
      await expect(page.locator('[data-testid="view-grid"]')).toHaveClass(/active/);
      await expect(page.locator('[data-testid="customers-grid"]')).toBeVisible();
      
      await page.locator('[data-testid="view-card"]').click();
      await page.waitForTimeout(2000); // Wait longer for view change
      
      await expect(page.locator('[data-testid="view-card"]')).toHaveClass(/active/);
    } catch (error) {
      test.fail(true, 'Could not find view toggle buttons');
    }
  });

  test('should navigate to customer details', async ({ page }) => {
    await page.waitForSelector('[data-testid="customers-card"]', { state: 'visible', timeout: 20000 });
    await page.waitForSelector('.card-header a', { state: 'visible', timeout: 20000 });
    
    const firstCustomerName = page.locator('.card-header a').first();
    await firstCustomerName.click();
    
    await page.waitForURL('**/customers/**/details', { timeout: 30000 });
    await expect(page.url()).toContain('/customers/');
    await expect(page.url()).toContain('/details');
  });

  test('should navigate to edit customer', async ({ page }) => {
    await page.waitForSelector('[data-testid="customers-card"]', { state: 'visible', timeout: 20000 });
    await page.waitForSelector('.card-header .edit-icon', { state: 'visible', timeout: 20000 });
    
    const editIcon = page.locator('.card-header .edit-icon').first();
    await editIcon.click();
    
    await page.waitForURL('**/customers/**/edit', { timeout: 30000 });
    await expect(page.url()).toContain('/customers/');
    await expect(page.url()).toContain('/edit');
  });

  test('should navigate to customer orders', async ({ page }) => {
    await page.waitForSelector('[data-testid="customers-card"]', { state: 'visible', timeout: 20000 });
    await page.waitForSelector('.card-body-right a', { state: 'visible', timeout: 20000 });
    
    const viewOrdersLink = page.locator('.card-body-right a').first();
    await viewOrdersLink.click();
    
    await page.waitForURL('**/customers/**/orders', { timeout: 30000 });
    await expect(page.url()).toContain('/customers/');
    await expect(page.url()).toContain('/orders');
  });
});
