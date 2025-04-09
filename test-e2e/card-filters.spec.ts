import { test, expect } from '@playwright/test';
import { filterCustomers } from './utils/test-utils';

test.describe('Card View Filter Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/customers');
  });

  test('should filter customers by first name', async ({ page }) => {
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
    await filterCustomers(page, 'Phoenix');
    
    const customerCities = await page.locator('.card-body-content').allTextContents();
    for (const city of customerCities) {
      expect(city.toLowerCase()).toContain('phoenix');
    }
  });

  test('should show all customers when filter is cleared', async ({ page }) => {
    const initialCustomerCount = await page.locator('.card').count();
    
    await filterCustomers(page, 'John');
    
    await filterCustomers(page, '');
    
    const clearedFilterCount = await page.locator('.card').count();
    expect(clearedFilterCount).toEqual(initialCustomerCount);
  });
});
