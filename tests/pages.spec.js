import { test, expect } from '@playwright/test';


// Homepage
test('HomePage', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');
  // Ensure each tab is visible
  await expect(page.locator('text=About')).toBeVisible();
  await expect(page.locator('text=Team')).toBeVisible();
  await expect(page.locator('text=Research')).toBeVisible();
  // Verify text in the 'About' tab
  await page.click('text=About');
  await expect(page.locator('text=The Centre for Integrated Renewable Energy Generation and Supply')).toBeVisible();
  // Verify text in the 'Team' tab
  await page.click('text=Team');
  await expect(page.locator('text=Alexandre Canet')).toBeVisible();
  await expect(page.locator('text=Ali Al-Waleel')).toBeVisible();
  await expect(page.locator('text=Maysam Qadrdan')).toBeVisible();
  await expect(page.locator('text=Nick Jenkins')).toBeVisible();
  await expect(page.locator('text=Jianzhong Wu')).toBeVisible();
});
