import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'

test.only('new blog form calls the event handler with the right details', async () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'test.com'
  }
  const createBlogMock = jest.fn()

  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlogMock}/>)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)

  createBlogMock.mockReturnValue({
    title: titleInput.value,
    author: authorInput.value,
    url: urlInput.value
  })

  await user.click(createButton)

  expect(createBlogMock).toHaveBeenCalled()
  expect(createBlogMock()).toEqual(blog)
})