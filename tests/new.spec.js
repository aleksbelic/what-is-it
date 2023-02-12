const {test, expect} = require('@playwright/test');

test('adding new abbreviation', async ({page}) => {
  await page.goto('/');
  const newAbbrKeyInput = await page.getByLabel('New abbreviation:');
  const newAbbrValueInput = await page.getByLabel('New abbreviation meaning:');

  await newAbbrKeyInput.fill('API');
  await expect(newAbbrKeyInput).toHaveValue('API');

  await newAbbrValueInput.fill('Application Programming Interface');
  await expect(newAbbrValueInput).toHaveValue(
    'Application Programming Interface'
  );
});
