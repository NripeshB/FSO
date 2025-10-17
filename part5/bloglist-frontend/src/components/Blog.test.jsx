import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Understanding React Testing',
    author: 'Nripesh Bhusal',
    url: 'https://example.com/blog/testing',
    likes: 42,
    user: { username: 'testuser', name: 'Test User' }
  }

  test('renders title and author but not url or likes by default', () => {
    render(<Blog blog={blog} />)

    const summaryDiv = screen.getByText(/Understanding React Testing/i)
    expect(summaryDiv).toBeInTheDocument()
    const element = screen.getByText(/Understanding React Testing\s*Nripesh Bhusal/i)
    expect(element).toBeInTheDocument()

    const url = screen.queryByText('https://example.com/blog/testing')
    const likes = screen.queryByText(/likes 42/i)

    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
  })
})
