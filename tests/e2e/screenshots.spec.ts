import { test } from '@playwright/test'
import path from 'path'

const SCREENSHOTS_DIR = path.join(__dirname, '../../assets/screenshots')

test('capture stream A dashboard', async ({ page }) => {
  await page.goto('/streams/a')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-stream-a.png'), fullPage: false })
})

test('capture stream B dashboard', async ({ page }) => {
  await page.goto('/streams/b')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-stream-b.png'), fullPage: false })
})

test('capture work item after status transition', async ({ page }) => {
  await page.goto('/streams/a')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: 'Move to Waiting' }).first().click()
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-status-transition.png'), fullPage: false })
})

test('capture full page', async ({ page }) => {
  await page.goto('/streams/a')
  await page.waitForLoadState('networkidle')
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-full-page.png'), fullPage: true })
})
