import { test, expect } from '@playwright/test';

test('user can create a new faction and see it listed', async ({ page }) => {
  // 1. Wait for the initial GET request so we know React has hydrated and loaded
  const initialLoad = page.waitForResponse(
    (res) => res.url().includes('/api/factions') && res.request().method() === 'GET'
  );
  await page.goto('/');
  await initialLoad;

  // 2. Fill the input after hydration is complete
  const factionName = `Adeptus Custodes ${Date.now()}`;
  const input = page.getByPlaceholder("Enter faction name (e.g., T'au Empire)");
  await input.fill(factionName);
  await expect(input).toHaveValue(factionName);

  // 3. Submit and wait for the POST response
  const createResponse = page.waitForResponse(
    (res) => res.url().includes('/api/factions') && res.request().method() === 'POST'
  );
  await page.getByRole('button', { name: 'Add Faction' }).click();

  const response = await createResponse;
  expect(response.status()).toBe(201);

  // 4. Verify the new faction appears in the list
  await expect(page.getByText(factionName)).toBeVisible();
});