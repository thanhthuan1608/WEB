import { test, expect } from '@playwright/test';

test('TC-E2E-01: Nhập URL và hiển thị danh sách UL LI', async ({ page }) => {

    await page.goto('/danh-sach-users.html');

    await page.locator('#api-url').fill('https://jsonplaceholder.typicode.com/users');
    await page.click('#fetch-button');

    await expect(page.locator('#result ul')).toBeVisible();
    await expect(page.locator('#result li')).toHaveCount(10);

});