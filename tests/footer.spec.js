import {test, expect} from '@playwright/test';

test('shows footer content', async ({page}) => {
  await page.goto('/');

  const footerElem = await page.locator('footer');
  const currentYear = new Date(Date.now()).getFullYear();

  await expect(footerElem).toBeVisible();
  await expect(footerElem).toHaveText(
    `Copyright © Aleksandar Belic, ${currentYear}`
  );
});
