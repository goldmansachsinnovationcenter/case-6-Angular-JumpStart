import { test, expect } from '@playwright/test';
import { login } from '../test-e2e/utils/test-utils';

test.describe('Visual Regression Tests', () => {
  test('should capture baseline for customers page', async ({ page }) => {
    await page.goto('/customers');
    await expect(page).toHaveScreenshot('customers-page.png');
  });

  test('should capture baseline for orders page', async ({ page }) => {
    await page.goto('/orders');
    await expect(page).toHaveScreenshot('orders-page.png');
  });

  test('should capture baseline for about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveScreenshot('about-page.png');
  });

  test('should capture baseline for login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('should capture baseline for customer details page', async ({ page }) => {
    await page.goto('/customers');
    await page.locator('.card-header a').first().click();
    await expect(page).toHaveScreenshot('customer-details-page.png');
  });

  test('should capture baseline for customer edit page', async ({ page }) => {
    await page.goto('/customers');
    await page.locator('.card-header .edit-icon').first().click();
    await expect(page).toHaveScreenshot('customer-edit-page.png');
  });

  test('should capture baseline for customer orders page', async ({ page }) => {
    await page.goto('/customers');
    await page.locator('.card-body-right a').first().click();
    await expect(page).toHaveScreenshot('customer-orders-page.png');
  });

  test('should capture baseline for customers grid view', async ({ page }) => {
    test.skip(true, 'Grid view test needs to be fixed');
    await page.goto('/customers');
    await page.locator('[data-testid="view-grid"]').click();
    await expect(page).toHaveScreenshot('customers-grid-view.png');
  });

  test('should capture baseline for customers map view', async ({ page }) => {
    test.skip(true, 'Map view test needs to be fixed');
    await page.goto('/customers');
    await page.locator('[data-testid="view-map"]').click();
    await page.waitForSelector('google-map', { state: 'visible', timeout: 10000 });
    await expect(page).toHaveScreenshot('customers-map-view.png');
  });

  test('should capture baseline for logged in state', async ({ page }) => {
    test.skip(true, 'Login test needs to be fixed');
    await login(page, 'asdf@asdf.com', '$asdf123$');
    await expect(page).toHaveScreenshot('logged-in-state.png');
  });
});
