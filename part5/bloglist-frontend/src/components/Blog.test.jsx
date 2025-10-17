import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import Blog from './Blog'
import likeService from './Likes'

test('renders title and author, not URL or likes by default', () => {
  const blog = {
    title: 'Learning Testing in React',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 7,
    user: { username: 'tester' }
  }

  render(<Blog blog={blog} setBlogs={() => {}} blogs={[]} />)

  const titleAuthor = screen.getByText('Learning Testing in React Test Author')
  expect(titleAuthor).toBeDefined()

  const url = screen.queryByText('https://example.com')
  const likes = screen.queryByText('likes 7')

  expect(url).toBeNull()
  expect(likes).toBeNull()
})



test('shows URL and likes when view button clicked', async () => {
  const blog = {
    title: 'Toggle visibility test',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 5,
    user: { username: 'tester' }
  }

  render(<Blog blog={blog} setBlogs={() => {}} blogs={[]} />)
  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  const url = screen.getByText('https://example.com')
  const likes = screen.getByText('likes 5')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})


vi.mock('./Likes', () => ({
  update: vi.fn().mockResolvedValue({
    id: '123',
    title: 'Like Counter',
    author: 'Tester',
    url: 'https://example.com',
    likes: 11,
    user: { username: 'tester' }
  })
}))


test('calls like handler twice when like button clicked twice', async () => {
  const blog = {
    id: '123',
    title: 'Like Counter',
    author: 'Tester',
    url: 'https://example.com',
    likes: 10,
    user: { username: 'tester' }
  }

  const mockUpdate = vi.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} setBlogs={mockUpdate} blogs={[blog]} />)

  const viewButton = screen.getByText('View')
  await user.click(viewButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdate).toHaveBeenCalledTimes(2)
  expect(likeService.default.update).toHaveBeenCalledTimes(2)
})
