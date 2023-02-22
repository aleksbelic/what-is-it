const {test, expect} = require('@playwright/test');

test('adding new abbreviation', async ({page}) => {
  await page.goto('/');
  const newAbbrKeyInput = await page.getByTestId('new-abbr-key');
  const newAbbrValueInput = await page.getByTestId('new-abbr-value');
  const submitNewAbbrButton = await page.getByTestId('new-abbr-submit');

  await expect(submitNewAbbrButton).toBeDisabled();

  await newAbbrKeyInput.fill('API');
  await expect(newAbbrKeyInput).toHaveValue('API');
  await expect(submitNewAbbrButton).toBeDisabled();

  await newAbbrValueInput.fill('Application Programming Interface');
  await expect(newAbbrValueInput).toHaveValue(
    'Application Programming Interface'
  );
  await expect(submitNewAbbrButton).toBeEnabled();
});
