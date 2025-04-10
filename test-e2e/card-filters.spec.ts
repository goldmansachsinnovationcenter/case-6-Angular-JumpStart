import { test, expect } from '@playwright/test';
import { filterCustomers, login } from './utils/test-utils';

test.describe('Card View Filter Tests', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, 'asdf@asdf.com', '$asdf123$');
    await page.goto('/customers');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Additional wait for page to fully load
  });

  test('should filter customers by first name', async ({ page }) => {
    test.skip(true, 'Filter test needs to be fixed');
    
    await page.waitForSelector('.card', { state: 'visible', timeout: 15000 });
    const initialCustomerCount = await page.locator('.card').count();
    
    await filterCustomers(page, 'John');
    
    const filteredCustomerCount = await page.locator('.card').count();
    expect(filteredCustomerCount).toBeLessThan(initialCustomerCount);
    
    const customerNames = await page.locator('.card-header a').allTextContents();
    for (const name of customerNames) {
      expect(name.toLowerCase()).toContain('john');
    }
  });

  test('should filter customers by city', async ({ page }) => {
    test.skip(true, 'Filter by city test needs to be fixed');
    
    await filterCustomers(page, 'Phoenix');
    
    const customerCities = await page.locator('.card-body-content').allTextContents();
    for (const city of customerCities) {
      expect(city.toLowerCase()).toContain('phoenix');
    }
  });

  test('should show all customers when filter is cleared', async ({ page }) => {
    test.skip(true, 'Filter clearing test needs to be fixed');
    
    await page.waitForSelector('.card', { state: 'visible', timeout: 15000 });
    const initialCustomerCount = await page.locator('.card').count();
    
    await filterCustomers(page, 'John');
    
    await filterCustomers(page, '');
    
    const clearedFilterCount = await page.locator('.card').count();
    expect(clearedFilterCount).toEqual(initialCustomerCount);
  });
});
