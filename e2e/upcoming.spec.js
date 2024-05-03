import { test, expect } from '@playwright/test'

test.describe('Upcoming movies test case', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto('http://localhost:5173/#/')
  })

  test.afterAll(async () => {
    page.close()
  })

  test('Navigation to upcoming page', async () => {
    const documentLink = page.locator("[href*='/upcoming']")
    await documentLink.click()
    await page.waitForLoadState('networkidle')

    const pageTitle = await page.locator('h1.ml-6').textContent()
    expect(pageTitle).toBe('Upcoming Movies')
  })
  test('Check upcoming movie dates', async () => {
    const documentLink = page.locator("[href*='/upcoming']")
    await documentLink.click()
    await page.locator('strong.date').first().waitFor()
    const minimumDateElement = await page.locator('strong.date').first().textContent()
    const maximumDateElement = await page.locator('strong.date').last().textContent()
    console.log('minimumDate', minimumDateElement)
    expect(minimumDateElement.trim()).not.toBe('')
    expect(maximumDateElement.trim()).not.toBe('')
  })
})
