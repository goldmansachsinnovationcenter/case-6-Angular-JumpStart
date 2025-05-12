import { test, expect } from '@playwright/test';

test.describe('About Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
  });

  test('should display about page content', async ({ page }) => {
    await expect(page.locator('[data-testid="about-view"]')).toBeVisible();
    await expect(page.locator('[data-testid="about-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="about-created-by"]')).toBeVisible();
    await expect(page.locator('[data-testid="about-blog"]')).toBeVisible();
    await expect(page.locator('[data-testid="about-github"]')).toBeVisible();
  });

  test('should have correct content in about page', async ({ page }) => {
    await expect(page.locator('[data-testid="about-header"]')).toContainText('About');
    
    const createdBySection = page.locator('[data-testid="about-created-by"]');
    await expect(createdBySection.locator('.col-md-2')).toContainText('Created by:');
    await expect(createdBySection.locator('.col-md-10 a')).toContainText('Dan Wahlin');
    
    const blogSection = page.locator('[data-testid="about-blog"]');
    await expect(blogSection.locator('.col-md-2')).toContainText('Blog:');
    await expect(blogSection.locator('.col-md-10 a')).toContainText('https://blog.codewithdan.com');
    
    const githubSection = page.locator('[data-testid="about-github"]');
    await expect(githubSection.locator('.col-md-2')).toContainText('GitHub:');
    await expect(githubSection.locator('.col-md-10 a')).toContainText('https://github.com/DanWahlin/Angular-JumpStart');
  });

  test('should navigate to about page from navbar', async ({ page }) => {
    await page.goto('/customers');
    await page.locator('[data-testid="navbar-about"]').click();
    await page.waitForURL('/about', { timeout: 5000 });
    await expect(page.url()).toContain('/about');
    await expect(page.locator('[data-testid="about-view"]')).toBeVisible();
  });
});
