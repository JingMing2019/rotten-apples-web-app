import express from 'express'

const router = express.Router()
import {
    getReviews,
    getReviewById,
    getReviewsByBookId,
    createBookReview,
    deleteBookReview, getReviewsByUserId,
} from '../controllers/reviewController.js'
import {authToken} from "../middlewares/authMiddleware.js";


router.route('/').get(getReviews)
router.route('/:id').get(getReviewById)

router.route('/book/:bid')
    .post(authToken, createBookReview)
    .get(getReviewsByBookId)

router.route('/user/:uid')
    .get(authToken, getReviewsByUserId)

router.route('/book/:bid/:rid').delete(authToken, deleteBookReview)


export default router