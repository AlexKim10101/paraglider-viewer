import { expect, test } from '@playwright/test'

test('глобус Cesium отрисовывается', async ({ page }) => {
  test.setTimeout(90_000)
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await expect(page.locator('[data-testid="cesium-container"] canvas')).toBeVisible({ timeout: 60_000 })
  await expect(page.getByRole('alert')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('язык переключается и сохраняется', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'RU' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Просмотр полётов')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru')

  await page.getByRole('button', { name: 'EN' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Flight Viewer')

  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Flight Viewer')
})

test('нет горизонтального скролла', async ({ page }) => {
  await page.goto('/')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})
