import { test, expect } from '@playwright/test';
import { goToPage } from './utils/test-utils';

test.describe('Pagination Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/customers');
  });

  test('should paginate customers', async ({ page }) => {
    await expect(page.locator('[data-testid="pagination"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="pagination-page-1"]')).toHaveClass(/active/);
    
    await goToPage(page, 2);
    
    await expect(page.locator('[data-testid="pagination-page-2"]')).toHaveClass(/active/);
    
    await page.locator('[data-testid="pagination-next"]').click();
    
    await expect(page.locator('[data-testid="pagination-page-3"]')).toHaveClass(/active/);
    
    await page.locator('[data-testid="pagination-previous"]').click();
    
    await expect(page.locator('[data-testid="pagination-page-2"]')).toHaveClass(/active/);
  });

  test('should paginate orders', async ({ page }) => {
    test.skip(true, 'Orders pagination needs to be fixed');
    
    await page.goto('/orders');
    
    await page.waitForTimeout(2000);
    
    await expect(page.locator('[data-testid="pagination"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="pagination-page-1"]')).toHaveClass(/active/);
    
    await goToPage(page, 2);
    
    await expect(page.locator('[data-testid="pagination-page-2"]')).toHaveClass(/active/);
  });
});
