import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import CreateBlog from './CreateBlog'

test('<CreateBlog /> calls event handler with correct details', async () => {
  const user = userEvent.setup()
  const mockHandleCreateBlog = vi.fn(e => e.preventDefault())
  const mockSetTitle = vi.fn()
  const mockSetAuthor = vi.fn()
  const mockSetUrl = vi.fn()
  render(
    <CreateBlog
      title=""
      author=""
      url=""
      setTitle={mockSetTitle}
      setAuthor={mockSetAuthor}
      setUrl={mockSetUrl}
      handleCreateBlog={mockHandleCreateBlog}
    />
  )
  const createNewBlogButton = screen.getByText('Create new Blog')
  await user.click(createNewBlogButton)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const createButton = screen.getByText('create')


  await user.type(titleInput, 'New Test Blog')
  expect(mockSetTitle).toHaveBeenCalledWith('N')
  await user.type(titleInput, 'ew Test Blog')

  await user.type(authorInput, 'React Tester')
  expect(mockSetAuthor).toHaveBeenCalledWith('R')

  await user.type(urlInput, 'https://testblog.com')
  expect(mockSetUrl).toHaveBeenCalledWith('h')

  await user.click(createButton)

  expect(mockHandleCreateBlog).toHaveBeenCalledTimes(1)
})
