import { test, expect } from '@playwright/test'

test.describe('Streams dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/streams/a')
    await page.evaluate(() => localStorage.removeItem('workshop-streams-v1'))
    await page.reload()
  })

  test('shows three stream tabs', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Stream A/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /Stream B/ })).toBeVisible()
    await expect(page.getByRole('link', { name: /Stream C/ })).toBeVisible()
  })

  test('stream A shows mock work items', async ({ page }) => {
    await expect(page.getByText('Deliver onboarding documentation')).toBeVisible()
    await expect(page.getByText('Weekly status report to stakeholder')).toBeVisible()
    await expect(page.getByText('Fix reported UI bug in dashboard')).toBeVisible()
  })

  test('user can add a work item', async ({ page }) => {
    await page.getByRole('button', { name: 'Add work item' }).click()
    await page.getByLabel('Title').fill('New test item')
    await page.getByRole('button', { name: 'Create' }).click()
    await expect(page.getByText('New test item')).toBeVisible()
  })

  test('user can change a work item status', async ({ page }) => {
    await page.getByRole('button', { name: 'Move to Waiting' }).first().click()
    await expect(page.getByText('Waiting').first()).toBeVisible()
  })

  test('closed items have no transition buttons', async ({ page }) => {
    await page.goto('/streams/b')
    const closedCard = page.getByText('Set up analytics tracking').locator('../..')
    await expect(closedCard.getByRole('button', { name: /Move to/ })).toHaveCount(0)
  })

  test('can navigate to stream B', async ({ page }) => {
    await page.getByRole('link', { name: /Stream B/ }).click()
    await expect(page.getByText('Write landing page copy')).toBeVisible()
  })

  test('can navigate to stream C', async ({ page }) => {
    await page.getByRole('link', { name: /Stream C/ }).click()
    await expect(page.getByText('LinkedIn post: AI-assisted testing')).toBeVisible()
  })
})
