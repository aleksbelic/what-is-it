import {test, expect} from '@playwright/test';

test('should return welcome msg for /api endpoint', async ({request}) => {
  const indexResponse = await request.get('/api');
  expect(await indexResponse.json()).toStrictEqual({
    message: 'Welcome to What is IT - API',
  });
});
