const {test, expect} = require('@playwright/test');

test('home page looks ok', async ({page}) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot();
});
