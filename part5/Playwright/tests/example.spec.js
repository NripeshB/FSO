const { test, expect, beforeEach, describe } = require('@playwright/test')

const baseURL = 'http://localhost:5173'  
const backendURL = 'http://localhost:3003' 

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${backendURL}/api/testing/reset`)

    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'password123',
    }
    await request.post(`${backendURL}/api/users`, { data: user })

    await page.goto(baseURL)
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
      await page.getByRole('textbox', { name: 'Password' }).fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
  await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword')
  await page.getByRole('button', { name: 'login' }).click()

  const error = page.getByText('Wrong username or password', { exact: true })
  await expect(error).toBeVisible()

  await expect(page.getByText('Test User logged in')).not.toBeVisible()
})

  })
})
