import { test, expect } from '@playwright/test'

test('After search, movie list', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const input = page.locator('.search-input')
  const movie = page.locator('.search-results li')

  await page.goto('http://localhost:5173/#/')
  await input.fill('spider')
  await page.waitForSelector('.search-results li', { state: 'visible' })
  await movie.first().waitFor()

  const movieTextContents = await movie.allTextContents()
  console.log(movieTextContents)

  const hasSpider = movieTextContents.some((text) => text.includes('Spider'))
  expect(hasSpider).toBeTruthy()
})

test('Popular movies', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('http://localhost:5173/#/')
  const link = page.locator("[href*='/popular']")
  await link.click()
  let name = page.locator('.title')
  await name.first().waitFor()
  const firstMovie = await name.first().textContent()
  await page.locator('input').click()
  await page.locator('input').fill(firstMovie)
  const movie = await page.locator('.title').textContent()
  console.log(movie)
  expect(movie).toBe(firstMovie)
})
