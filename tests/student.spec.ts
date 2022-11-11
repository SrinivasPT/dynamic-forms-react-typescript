import { test } from '@playwright/test';

test('Change First Name', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('#firstName').fill('Peter');
});
