import {test, expect} from '@playwright/test';

test('adding new abbreviation', async ({page}) => {
  await page.goto('/');
  const newAbbrNameInput = await page.getByTestId('new-abbr-name');
  const newAbbrMeaningInput = await page.getByTestId('new-abbr-meaning');
  const submitNewAbbrButton = await page.getByTestId('new-abbr-submit');

  await expect(submitNewAbbrButton).toBeDisabled();

  await newAbbrNameInput.fill('API');
  await expect(newAbbrNameInput).toHaveValue('API');
  await expect(submitNewAbbrButton).toBeDisabled();

  await newAbbrMeaningInput.fill('Application Programming Interface');
  await expect(newAbbrMeaningInput).toHaveValue(
    'Application Programming Interface'
  );
  await expect(submitNewAbbrButton).toBeEnabled();
});
