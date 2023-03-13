const {test, expect} = require('@playwright/test');

test('home page looks ok', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();
});
