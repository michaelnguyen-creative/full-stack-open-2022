import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'

test.only('new blog form calls the event handler with the right details', async () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'test.com',
    likes: 10,
  }

  const createBlogMock = jest.fn()
  createBlogMock.mockReturnValue(blog)

  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlogMock}/>)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'test')
  await user.type(authorInput, 'tester')
  await user.type(urlInput, 'test.com')
  await user.click(createButton)
  screen.debug()

  expect(createBlogMock).toHaveBeenCalled()
  expect(createBlogMock()).toEqual(blog)
})