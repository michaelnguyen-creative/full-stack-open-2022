import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('initially renders only title & author', () => {
  const blog = {
    title: 'test',
    author: 'test',
    url: 'test.com',
    likes: 10,
  }

  render(<Blog blog={blog} />)
  // screen.debug()
  const element = screen.getByText('test test')
  expect(element).toBeDefined()
})

test('click view button renders blog url & author', async () => {
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
  const button = container.querySelector('.view')
  await user.click(button)
  // screen.debug()

  const url = screen.getByText('test.com')
  const likes = screen.getByText('likes: 10')
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
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