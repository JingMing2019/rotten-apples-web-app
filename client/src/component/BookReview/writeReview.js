import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '@mui/material/Rating'
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography'
import { BOOK_CREATE_REVIEW_RESET } from '../../constants/bookConstants'
import {FormControlLabel} from "@mui/material";
import {createBookReview} from "../../actions/reviewActions";

const WriteReview = () => {
    const { id: bookId } = useParams()
    let [comment, setComment] = useState('')
    let [rating, setRating] = useState(0)
    let [isAnonymous, setIsAnonymous] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const submitReviewHandler = (e) => {
        setIsSending(true)
        e.preventDefault()
        dispatch(
            createBookReview(bookId, {
                rating,
                comment,
                isAnonymous,

            }, setIsSending)
        )
    }

    const bookCreateReview = useSelector(state => state.bookCreateReview)
    const { success: createReviewSuccess } = bookCreateReview

    useEffect(() => {
        if (createReviewSuccess) {
            setComment('')
            setRating(0)
            dispatch({ type: BOOK_CREATE_REVIEW_RESET })
        }
    }, [createReviewSuccess, dispatch])

    return (
        <>
            <form action="#" className="reviews-form">
                <h2 id="writeReview" name="writeReview">
                    Write a review
                </h2>
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e) => {
                        rating !== parseInt(e.target.value) && setRating(parseInt(e.target.value))
                    }}
                    disabled={!userInfo}
                />
                <div className="form-group">
                    <label htmlFor="review">
                        Review
                    </label>
                    <textarea
                        className="form-control"
                        rows="8"
                        id="review"
                        value={comment}
                        placeholder="Write your review"
                        onChange={(event) => setComment(event.target.value)}
                        disabled={!userInfo}/>
                </div>

                <FormControlLabel
                    label="Anonymous"
                    control={
                        <Checkbox
                            checked={isAnonymous}
                            onChange={(e) => {
                                setIsAnonymous(e.target.checked);
                            }}
                        />}
                />

                <div className="padding-top-20">
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={submitReviewHandler}
                        disabled={isSending || !userInfo || (rating === 0 && comment === "")}
                    >
                        Send
                    </button>
                </div>
            </form>
        </>
    )
}

export default WriteReview
