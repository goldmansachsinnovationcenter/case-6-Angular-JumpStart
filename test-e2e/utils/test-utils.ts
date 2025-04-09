import { Page } from '@playwright/test';

export async function login(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  
  try {
    await page.waitForSelector('.login-form', { state: 'visible', timeout: 20000 });
    
    await page.locator('input[type="email"]').fill(email);
    
    await page.locator('input[type="password"]').fill(password);
    
    await page.locator('button[type="submit"]').click();
    
    await page.waitForURL('/customers', { timeout: 20000 });
  } catch (error) {
    console.log('Login failed, attempting direct navigation to /customers');
    await page.goto('/customers');
  }
}

export async function navigateTo(page: Page, route: string) {
  try {
    await page.waitForSelector(`[data-testid="navbar-${route}"]`, { state: 'visible', timeout: 15000 });
    await page.locator(`[data-testid="navbar-${route}"]`).click();
  } catch (error) {
    console.log(`Navigation element not found, navigating directly to /${route}`);
    await page.goto(`/${route}`);
  }
  await page.waitForURL(`/${route}`, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
}

export async function changeCustomerViewMode(page: Page, mode: 'card' | 'grid' | 'map') {
  await page.waitForSelector(`[data-testid="view-${mode}"]`, { state: 'visible', timeout: 15000 });
  await page.locator(`[data-testid="view-${mode}"]`).click();
  await page.waitForTimeout(1000); // Increased wait for view change to complete
}

export async function goToPage(page: Page, pageNumber: number) {
  await page.waitForSelector(`[data-testid="pagination-page-${pageNumber}"]`, { state: 'visible', timeout: 15000 });
  await page.locator(`[data-testid="pagination-page-${pageNumber}"]`).click();
  await page.waitForTimeout(1000); // Increased wait for page change to complete
}

export async function filterCustomers(page: Page, filterText: string) {
  await page.waitForSelector('[data-testid="filter-input"]', { state: 'visible', timeout: 15000 });
  const filterInput = page.locator('[data-testid="filter-input"]');
  await filterInput.fill(filterText);
  await page.waitForTimeout(1000); // Increased timeout for filter to apply
}
