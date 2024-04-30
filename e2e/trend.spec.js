import { test, expect } from '@playwright/test'

test.describe('Trending movies func..', () => {
  let page

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()
    await page.goto('http://localhost:5173/#/')
  })

  test.afterAll(async () => {
    page.close()
  })

  test('Navigation to trending page', async () => {
    const documentLink = page.locator("[href*='/trending']")
    await documentLink.click()
    const pageTitle = await page.locator('h1.ml-6').textContent()
    expect(pageTitle).toBe('Trends')

    const button1 = await page.locator('button.trend').first()
    const button2 = await page.locator('button.trend').last()

    expect(await button1.textContent()).toBe('Today')
    expect(await button2.textContent()).toBe('This Week')
    await expect(button1).toHaveClass('bg-red-700 active trend p-0.5 mr-3 border border-white')
    await expect(button2).not.toHaveClass('bg-red-700 active trend p-0.5 mr-3 border border-white')
    await button2.click()
    await expect(button1).not.toHaveClass('bg-red-700 active trend p-0.5 mr-3 border border-white')
    await expect(button2).toHaveClass('bg-red-700 active trend p-0.5 mr-3 border border-white')
  })

  test('Movie List', async () => {
    const documentLink = page.locator("[href*='/trending']")
    await documentLink.click()
    const movieTitle = await page.locator('h2.title')
    await page.waitForSelector('h2.title')
    const button1 = await page.locator('button.trend').first()

    await button1.click()
    await page.waitForSelector('h2.title')
    let movieWeekList = await movieTitle.allTextContents()

    expect(movieWeekList.length).toBe(20)
    const button2 = await page.locator('button.trend').last()
    await button2.click()
    await page.waitForSelector('h2.title')

    let movieTodayList = await movieTitle.allTextContents()
    expect(movieTodayList.length).toBe(20)
  })
})
