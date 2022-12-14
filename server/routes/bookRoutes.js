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

router.route('/:id')
    .get(getBookById)
    .delete(authToken, authAdminAndWriter, deleteBook)
    .put(authToken, authWriter, updateBook)

export default router
