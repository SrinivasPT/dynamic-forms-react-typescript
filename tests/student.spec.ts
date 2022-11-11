import { Page, test } from '@playwright/test';
import { PageObject } from './page';

test.describe('Student Test', () => {
    let page: Page;
    let pageObject: PageObject;

    test.beforeEach(async ({ page }) => {
        pageObject = new PageObject();
        await pageObject.loadData('STUDENT', 1000);
        await page.goto('http://localhost:3000/');
    });

    test('Change First Name', async ({ page }) => {
        await pageObject.fillSection('details', page);
        await page.locator('text=Submit').click();
    });
});
