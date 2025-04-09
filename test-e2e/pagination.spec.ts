import { test, expect } from '@playwright/test';
import { goToPage, login } from './utils/test-utils';

test.describe('Pagination Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'asdf@asdf.com', '$asdf123$');
    await page.goto('/customers');
    await page.waitForLoadState('networkidle');
  });

  test('should paginate customers', async ({ page }) => {
    await page.waitForSelector('[data-testid="pagination"]', { state: 'visible', timeout: 15000 });
    await expect(page.locator('[data-testid="pagination"]')).toBeVisible();
    
    await page.waitForSelector('[data-testid="pagination-page-1"]', { state: 'visible', timeout: 15000 });
    await expect(page.locator('[data-testid="pagination-page-1"]')).toHaveClass(/active/);
    
    await goToPage(page, 2);
    
    await expect(page.locator('[data-testid="pagination-page-2"]')).toHaveClass(/active/);
    
    await page.locator('[data-testid="pagination-next"]').click();
    await page.waitForTimeout(500); // Wait for page change to complete
    
    await expect(page.locator('[data-testid="pagination-page-3"]')).toHaveClass(/active/);
    
    await page.locator('[data-testid="pagination-previous"]').click();
    await page.waitForTimeout(500); // Wait for page change to complete
    
    await expect(page.locator('[data-testid="pagination-page-2"]')).toHaveClass(/active/);
  });

  test('should paginate orders', async ({ page }) => {
    test.skip(true, 'Orders pagination needs to be fixed');
    
    await page.goto('/orders');
    await page.waitForLoadState('networkidle');
    
    await page.waitForSelector('[data-testid="pagination"]', { state: 'visible', timeout: 15000 });
    await expect(page.locator('[data-testid="pagination"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="pagination-page-1"]')).toHaveClass(/active/);
    
    await goToPage(page, 2);
    
    await expect(page.locator('[data-testid="pagination-page-2"]')).toHaveClass(/active/);
  });
});
