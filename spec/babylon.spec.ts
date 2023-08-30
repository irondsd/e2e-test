import { test, expect } from '@playwright/test'

test.describe('babylon', async () => {
  test('babylon title', async ({ page }) => {
    await page.goto('https://babylon.art/')

    await expect(page).toHaveTitle('Babylon')
  })

  test('test banner', async ({ page }) => {
    await page.goto('https://babylon.art/')

    const bannerText = page.locator(
      ':text("This website uses cookies to ensure you get the best experience on our website.")'
    )

    await expect(bannerText).toBeOnPage()
    expect(bannerText).toHaveText('This website uses cookies to ensure you get the best experience on our website.')

    const bannerTextHandle = await bannerText.elementHandle()
    const bannerElement = await bannerTextHandle?.$('xpath=..')

    const okayButton = await bannerElement?.$('button')

    const okayButtonText = await okayButton?.innerText()

    expect(okayButtonText).toBe('OKAY')

    await okayButton?.click()
    await page.waitForTimeout(100)
    const isElementVisible = await bannerText.isVisible()

    expect(isElementVisible).toBeFalsy()
  })

  test('test collect button', async ({ page }) => {
    await page.goto('https://babylon.art/')

    const buttons = page.locator('div:text("collect editions")')

    const [buttonEl] = await buttons.elementHandles()
    expect(buttonEl).toBeTruthy()

    await buttonEl.click()
    expect(page).toHaveURL('https://babylon.art/curated-gallery')
    expect(page).toHaveTitle('Curated gallery | Babylon')

    await page.waitForLoadState('load')

    const pageTitle = page.locator('h1:text("Curated gallery")')

    await expect(pageTitle).toBeOnPage()
  })

  test('go to listing page', async ({ page }) => {
    await page.goto('https://babylon.art/')
    await page.getByRole('button', { name: 'collect editions' }).first().click()
    await page.getByRole('link', { name: 'Ended' }).click()
    await page.getByRole('link', { name: 'Something Like a Dream You Me and The End of the World' }).click()

    const title = page.locator('h1:text("Something Like a Dream")')
    await expect(title).toBeOnPage()
  })

  test('open google', async ({ page }) => {
    await page.goto('https://google.com')
  })
})
