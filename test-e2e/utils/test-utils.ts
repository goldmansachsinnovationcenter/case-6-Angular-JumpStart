import { Page } from '@playwright/test';

export async function login(page: Page, email: string, password: string) {
  await page.goto('/login');
  await page.locator('[data-testid="login-email"]').fill(email);
  await page.locator('[data-testid="login-password"]').fill(password);
  await page.locator('[data-testid="login-submit"]').click();
  await page.waitForURL('/customers');
}

export async function navigateTo(page: Page, route: string) {
  await page.locator(`[data-testid="navbar-${route}"]`).click();
  await page.waitForURL(`/${route}`);
}

export async function changeCustomerViewMode(page: Page, mode: 'card' | 'grid' | 'map') {
  await page.locator(`[data-testid="view-${mode}"]`).click();
}

export async function goToPage(page: Page, pageNumber: number) {
  await page.locator(`[data-testid="pagination-page-${pageNumber}"]`).click();
}

export async function filterCustomers(page: Page, filterText: string) {
  const filterInput = page.locator('[data-testid="customer-filter"] input');
  await filterInput.fill(filterText);
  await page.waitForTimeout(300);
}
