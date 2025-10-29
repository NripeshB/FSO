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
    await page.evaluate(() => localStorage.clear())
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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox', { name: 'Username' }).fill('testuser')
      await page.getByRole('textbox', { name: 'Password' }).fill('password123')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
  await page.getByRole('button', { name: /create new blog|new blog/i }).click()
  await expect(page.getByLabel('title')).toBeVisible()
  
  await page.getByLabel('title').fill('Test Blog Title')
  await page.getByLabel('author').fill('Test Author')
  await page.getByLabel('url').fill('http://testblog.com')
  await page.getByRole('button', { name: /create/i }).click()
  
  // Wait for the specific blog element with View button
  const blogInList = page.getByText('Test Blog Title Test Author').locator('..').filter({ has: page.getByRole('button', { name: 'View' }) })
  await expect(blogInList).toBeVisible()
})

test('a blog can be liked', async ({ page }) => {
  await page.getByRole('button', { name: /create new blog|new blog/i }).click()
  await page.getByLabel('title').fill('Blog to Like')
  await page.getByLabel('author').fill('Like Author')
  await page.getByLabel('url').fill('http://likeblog.com')
  await page.getByRole('button', { name: /create/i }).click()

  // ✅ Narrow to the blog list area and exact text match
  const blogInList = page.locator('.blog') // use your blog item class or container
    .filter({ hasText: /^Blog to Like\s+Like Author$/ })

  await expect(blogInList).toBeVisible()

  await blogInList.getByRole('button', { name: 'View' }).click()
  await expect(blogInList.getByRole('button', { name: 'Hide' }))
    .toBeVisible({ timeout: 3000 })

  const likeButton = blogInList.getByRole('button', { name: 'Like' })
  await likeButton.click()
  await expect(blogInList.getByText(/likes?\s*1/i)).toBeVisible()
})



// 5.21: Blog deletion by creator test - FIXED
test('user can delete their own blog', async ({ page }) => {
  // Create blog
  await page.getByRole('button', { name: /create new blog|new blog/i }).click()
  await page.getByLabel('title').fill('Blog to Delete')
  await page.getByLabel('author').fill('Delete Author')
  await page.getByLabel('url').fill('http://deleteblog.com')
  await page.getByRole('button', { name: /create/i }).click()
  
  // Wait for blog in list - USE SPECIFIC SELECTOR
  const blogInList = page.getByText('Blog to Delete Delete Author').locator('..').filter({ has: page.getByRole('button', { name: 'View' }) })
  await expect(blogInList).toBeVisible()
  
  // Set up dialog handler BEFORE clicking
  page.once('dialog', dialog => dialog.accept())
  
  // Click view and delete
  await blogInList.getByRole('button', { name: /view/i }).click()
  await blogInList.getByRole('button', { name: /delete/i }).click()
  
  // Verify blog is removed
  await expect(blogInList).not.toBeVisible()
})

// 5.22: Delete button visibility test - FIXED
test('only creator sees delete button for their blog', async ({ page, request }) => {
  // Create second user
  const secondUser = {
    name: 'Second User',
    username: 'seconduser',
    password: 'password123',
  }
  await request.post(`${backendURL}/api/users`, { data: secondUser })
  
  // Create blog with first user
  await page.getByRole('button', { name: /create new blog|new blog/i }).click()
  await page.getByLabel('title').fill('First User Blog')
  await page.getByLabel('author').fill('First Author')
  await page.getByLabel('url').fill('http://firstblog.com')
  await page.getByRole('button', { name: /create/i }).click()
  
  // Wait for blog - USE SPECIFIC SELECTOR
  const blogInList = page.getByText('First User Blog First Author').locator('..').filter({ has: page.getByRole('button', { name: 'View' }) })
  await expect(blogInList).toBeVisible()
  await blogInList.getByRole('button', { name: /view/i }).click()
  await expect(blogInList.getByRole('button', { name: /delete/i })).toBeVisible()
  
  // Logout first user
  await page.getByRole('button', { name: /logout/i }).click()
  await expect(page.getByText('log in to application')).toBeVisible()
  
  // Login as second user
  await page.getByRole('textbox', { name: 'Username' }).fill('seconduser')
  await page.getByRole('textbox', { name: 'Password' }).fill('password123')
  await page.getByRole('button', { name: 'login' }).click()
  await expect(page.getByText('Second User logged in')).toBeVisible()
  
  // Verify delete button is NOT visible for second user
  await blogInList.getByRole('button', { name: /view/i }).click()
  await expect(blogInList.getByRole('button', { name: /delete/i })).not.toBeVisible()
})

// 5.23: Blog ordering by likes test - FIXED
test('blogs are ordered by likes', async ({ page }) => {
  const blogs = [
    { title: 'Blog with 2 likes', author: 'Author 1', url: 'http://blog1.com', likes: 2 },
    { title: 'Blog with 5 likes', author: 'Author 2', url: 'http://blog2.com', likes: 5 },
    { title: 'Blog with 1 like', author: 'Author 3', url: 'http://blog3.com', likes: 1 }
  ]

  // Create all blogs
  for (const blog of blogs) {
    await page.getByRole('button', { name: /create new blog|new blog/i }).click()
    await page.getByLabel('title').fill(blog.title)
    await page.getByLabel('author').fill(blog.author)
    await page.getByLabel('url').fill(blog.url)
    await page.getByRole('button', { name: /create/i }).click()
    
    // Wait for blog in list - USE SPECIFIC SELECTOR
    const fullTitle = `${blog.title} ${blog.author}`
    const blogElement = page.getByText(fullTitle).locator('..').filter({ has: page.getByRole('button', { name: 'View' }) })
    await expect(blogElement).toBeVisible()
    
    // Close form if needed
    try {
      await page.getByRole('button', { name: /close|cancel/i }).click({ timeout: 1000 })
    } catch (e) {
      // Form already closed
    }
  }

  // Add likes to each blog
  for (const blog of blogs) {
    const fullTitle = `${blog.title} ${blog.author}`
    const blogElement = page.getByText(fullTitle).locator('..').filter({ has: page.getByRole('button', { name: 'View' }) })
    await blogElement.getByRole('button', { name: /view/i }).click()
    
    for (let i = 0; i < blog.likes; i++) {
      await blogElement.getByRole('button', { name: /like/i }).click()
      await page.waitForTimeout(300)
    }
    
    await blogElement.getByRole('button', { name: /hide/i }).click()
  }

  // Wait for any animations
  await page.waitForTimeout(500)

  // Get all blog containers and check their like counts
  const blogContainers = page.locator('div').filter({ has: page.getByRole('button', { name: /view|hide/i }) })
  const count = await blogContainers.count()
  expect(count).toBe(3)

  // Extract like counts and verify order
  const likeCounts = []
  for (let i = 0; i < count; i++) {
    const container = blogContainers.nth(i)
    const text = await container.textContent()
    const likeMatch = text.match(/likes? (\d+)/)
    likeCounts.push(likeMatch ? parseInt(likeMatch[1]) : 0)
  }

  // Should be sorted descending: [5, 2, 1]
  expect(likeCounts[0]).toBe(5)
  expect(likeCounts[1]).toBe(2) 
  expect(likeCounts[2]).toBe(1)
})
  })
})