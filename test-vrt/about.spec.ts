import { test, expect } from '@playwright/test';

test.describe('About Page Visual Regression Tests', () => {
  test('should match visual snapshot of about page', async ({ page }) => {
    await page.goto('/about');
    await page.waitForSelector('[data-testid="about-view"]', { state: 'visible' });
    await expect(page).toHaveScreenshot('about-page.png');
  });
});
