const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./list_helper')

const blogs = [
  {
    _id: '1',
    title: 'Blog A',
    author: 'Alice',
    url: 'http://a.com',
    likes: 7,
    __v: 0,
  },
  {
    _id: '2',
    title: 'Blog B',
    author: 'Bob',
    url: 'http://b.com',
    likes: 5,
    __v: 0,
  },
  {
    _id: '3',
    title: 'Blog C',
    author: 'Alice',
    url: 'http://c.com',
    likes: 12,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of a bigger list is calculated correctly', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 24)
  })
})

describe('favorite blog', () => {
  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2]) 
  })
})

describe('most blogs', () => {
  test('returns author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Alice', blogs: 2 })
  })
})

describe('most likes', () => {
  test('returns author with most total likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Alice', likes: 19 })
  })
})
