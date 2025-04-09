import { test, expect } from '@playwright/test';
import { changeCustomerViewMode } from './utils/test-utils';

test.describe('Customer Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/customers');
  });

  test('should switch between card and list views', async ({ page }) => {
    await expect(page.locator('[data-testid="view-card"]')).toHaveClass(/active/);
    
    await changeCustomerViewMode(page, 'grid');
    
    await expect(page.locator('[data-testid="view-grid"]')).toHaveClass(/active/);
    await expect(page.locator('[data-testid="customers-grid"]')).toBeVisible();
    
    await changeCustomerViewMode(page, 'card');
    
    await expect(page.locator('[data-testid="view-card"]')).toHaveClass(/active/);
  });

  test('should navigate to customer details', async ({ page }) => {
    const firstCustomerName = page.locator('.card-header a').first();
    await firstCustomerName.click();
    
    await expect(page.url()).toContain('/customers/');
    await expect(page.url()).toContain('/details');
  });

  test('should navigate to edit customer', async ({ page }) => {
    const editIcon = page.locator('.card-header .edit-icon').first();
    await editIcon.click();
    
    await expect(page.url()).toContain('/customers/');
    await expect(page.url()).toContain('/edit');
  });

  test('should navigate to customer orders', async ({ page }) => {
    const viewOrdersLink = page.locator('.card-body-right a').first();
    await viewOrdersLink.click();
    
    await expect(page.url()).toContain('/customers/');
    await expect(page.url()).toContain('/orders');
  });
});
