import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('initially renders only title & author, not url & likes', () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'test.com',
    likes: 10,
  }

  render(<Blog blog={blog} />)
  // screen.debug()
  const element = screen.getByRole('blog-view')
  // screen.debug(element)
  expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(element).not.toHaveTextContent(`${blog.url} ${blog.likes}`)
})

test.only('click view button renders blog url & number of likes', async () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'test.com',
    likes: 10,
    user: {
      name: undefined
    }
  }

  const user = userEvent.setup()

  const container = render(<Blog blog={blog} />).container
  // screen.debug()
  const viewButton = container.querySelector('.view')
  await user.click(viewButton)

  const element = screen.getByRole('blog-remove')
  screen.debug(element)
  expect(element).toHaveTextContent(`${blog.url}`)
  expect(element).toHaveTextContent(`${blog.likes}`)
})

// Have not passed, come back later
test('mock function is called twice when button is clicked twice', async () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'test.com',
    likes: 10,
    user: {
      name: undefined
    }
  }

  const updateLikeMock = jest.fn()
  // const updateLikeMock = jest.fn()
  const user = userEvent.setup()

  const container = render(<Blog blog={blog} updateLike={updateLikeMock()} />).container
  // screen.debug()
  const viewButton = container.querySelector('.view')
  await user.click(viewButton)

  screen.debug()
  // const a = render(<Blog blog={blog} handleLike={handleLikeMock} />).container

  // const likeButton = container.querySelector('.likeButton')
  const likeButton = screen.getByText('like')
  await user.dblClick(likeButton)
  screen.debug()

  expect(updateLikeMock).toHaveBeenCalledTimes(2)
})