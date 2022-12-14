import express from 'express'

const router = express.Router()
import {
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  createBook,
  getTopBooks,
  getRecentReviewedBooks,
  getUserRecentReviewedBooks,
} from '../controllers/bookController.js'
import {
  authWriter,
  authToken,
  authAdminAndWriter
} from '../middlewares/authMiddleware.js'

router.route('/')
    .get(getBooks)
    .post(authToken, authWriter, createBook)

router.get('/top/:limit', getTopBooks)
router.get('/recent-reviewed/:limit', getRecentReviewedBooks)
router.get('/recent-reviewed/:limit/:uid', authToken, getUserRecentReviewedBooks)

router.route('/:id')
    .get(getBookById)
    .delete(authToken, authAdminAndWriter, deleteBook)
    .put(authToken, authWriter, updateBook)

export default router
