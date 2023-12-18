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

// Heat Demand Page
test('HeatDemand Page Should Load Graph', async ({ page }) => {
  await page.goto('/demand');
  // Verify the tooltip has rendered
  await expect(page.locator('text=Demand Before')).toBeVisible();
  // Verify the legend has found the upper limit
  await expect(page.locator('text=5,808,130,350 kW⋅h')).toBeVisible();
});
test('HeatDemand graph should be clickable and redirect', async ({ page }) => {
  await page.goto('/demand');
  
  await page.getByAltText("Cardiff").last().click();

  await expect(page).toHaveURL('/demand/lsoa/W06000015');

});
// Efficiency Costs Page 
test('Efficiency Costs Page Should Load Graph', async ({ page }) => {
  await page.goto('/costs');
  // Verify the tooltip has rendered
  await expect(page.locator('text=Hover to view')).toBeVisible();
  // Verify the legend has found the upper limit
  await expect(page.locator('text=£1,233,483,676')).toBeVisible();
});

test('Efficiency Costs graph should be clickable and redirect', async ({ page }) => {
  await page.goto('/costs');

  await page.click('text=Barnet');
  // Expect correct values for the Barnet LAD
  await expect(page.locator('text=35,349')).toBeVisible();


});