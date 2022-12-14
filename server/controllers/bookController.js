import asyncHandler from 'express-async-handler' // asyncHandler is a middleware that is used to wrap async functions
import * as BookDao from "../daos/bookDao.js";
import * as ReviewDao from "../daos/reviewDao.js";
import * as UserDao from "../daos/userDao.js";
import {USER_ROLE_ADMIN, USER_ROLE_WRITER} from "../constants/userConstant.js";

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await BookDao.findBooks()

  res.json({
    success: true,
    count: books.length,
    data: books,
  })
})

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await BookDao.findBookById(req.params.id)

  res.json(book)
})

// @desc    Admin Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin and Private/Writer
// writer can only delete his own book
// admin can delete any books
const deleteBook = asyncHandler(async (req, res) => {
  const book = await BookDao.findBookById(req.params.id)
  const users = await UserDao.findUsersByIdArray(book.liked)


  if (req.user.role === USER_ROLE_ADMIN ||
      (req.user.role === USER_ROLE_WRITER && req.user.ownedBooks.includes(req.params.id))
  ) {
    await BookDao.deleteBook(req.params.id)

    for(let i = 0; i < users.length; i++) {
      users[i].likedBooks = users[i].likedBooks.filter(
          (data) => !data.book.equals(req.params.id))
      await users[i].save()
    }

    return res.sendStatus(200)
  } else {
    res.status(401)

    throw new Error('Not authorized')
  }

})

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Writer
const createBook = asyncHandler(async (req, res) => {
  const book = req.body

  const existed = await BookDao.checkBookExistsByItem(book.title, book.subtitle, book.authors, book.published_date)

  if (!existed) {
    const newBook = {
      title: book.title,
      subtitle: book.subtitle,
      authors: book.authors,
      image_url: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/vintage-book-cover-template-design-fe1040a9952994208fcae6066ab78f2b_screen.jpg?ts=1636980773",
      rating: 0,
      liked: [],
      stats: {
        numReviews: 0,
        likes: 0,
      },
      description: book.description,
      published_date: book.published_date,
      page: book.page,
    }
    const createdBook = await BookDao.createBook(newBook)

    return res.status(201).json(createdBook)
  } else {
    res.status(400)
    throw new Error('Book already exists')
  }
})

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Writer
const updateBook = asyncHandler(async (req, res) => {
  if(req.user.ownedBooks.includes(req.params.id)) {
    const book = req.body

    await BookDao.findBookById(req.params.id)

    const updatedBook = await BookDao.updateBook(req.params.id, book)
    res.json(updatedBook)
  } else {
    res.status(400)
    throw new Error("Book can only be updated by the owner")
  }
})



// @desc    Get top rated books
// @route   GET /api/books/top/:limit
// @access  Public
const getTopBooks = asyncHandler(async (req, res) => {
  const books = await BookDao.findTopBooks(req.params.limit)

  res.json(books)
})

const findUniqueBooks = (reviews, allBooks, limit) => {
  let books = []
  for (let i = 0; i < reviews.length; i++){
    if (books.length === parseInt(limit)){
      break
    }
    const book = allBooks.find(book => book._id.equals(reviews[i].book))
    if (!books.includes(book)) {
      books.push(book)
    }
  }

  return books
}
// @desc    Get recent-reviewed books
// @route   GET /api/books/recent-reviewed/:limit
// @access  Public
const getRecentReviewedBooks = asyncHandler(async (req, res) => {
  // const books = await Review.find({})
  //   .sort({ updatedAt: -1 })
  //   .populate('book')
  //   .limit(req.params.limit)

  const reviews = await ReviewDao.findRecentReviews()
  const allBooks = await BookDao.findBooks()

  const books = findUniqueBooks(reviews, allBooks, req.params.limit)

  res.json(books)
})

// @desc    Get recent-reviewed books
// @route   GET /api/books/recent-reviewed/:limit/:uid
// @access  Public
const getUserRecentReviewedBooks = asyncHandler(async (req, res) => {
  const reviews = await ReviewDao.findReviewsByUserId(req.params.uid)
  const allBooks = await BookDao.findBooks()

  const books = findUniqueBooks(reviews, allBooks, req.params.limit)

  res.json(books)
})

export {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  getTopBooks,
  getRecentReviewedBooks,
  getUserRecentReviewedBooks
}
