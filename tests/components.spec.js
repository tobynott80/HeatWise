import { test, expect } from '@playwright/test';

// Navbar Tests

test('Navbar List Items', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');
  // Ensure each tab is visible
  await expect(page.locator('text=Home')).toBeVisible();
  await expect(page.locator('text=Change in Heat Demand')).toBeVisible();
  await expect(page.locator('text=Energy Efficiency Costs')).toBeVisible();
  await expect(page.locator('text=Heat Consumption Profile')).toBeVisible();
});

test('Navbar demand navigation redirect', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Change in Heat Demand');
  await page.waitForURL("/demand");
  await expect(page).toHaveURL('/demand');
});
test('Navbar efficiency costs navigation redirect', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Energy Efficiency Costs');
  await page.waitForURL("/costs");
  await expect(page).toHaveURL('/costs');
});

test('Navbar heat consumption navigation redirect', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Heat Consumption Profile');
  await page.waitForURL("/consumption");
  await expect(page).toHaveURL('/consumption');
});

