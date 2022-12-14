import React, { useEffect, useState } from 'react'
import RatingStar from '../Rating/ratingStar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile, likeBook, unLikeBook } from '../../actions/userActions'
import sampleCover from "../../vendors/img/book-cover-sample.png"

const BookInfo = ({ bookInfo }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userProfile = useSelector(state => state.userProfile)
  const { user } = userProfile

  const [book, setBook] = useState(bookInfo)
  useEffect(() => {
    if (userInfo && !user.name) {
      dispatch(getUserProfile())
    }

  }, [dispatch, userInfo, user])

  const likeBookHandler = () => {
    if (!book.liked.includes(userInfo._id)) {
      // like book
      const newBook = {
        ...book,
        liked: [...book.liked, userInfo._id],
      }
      setBook(newBook)
  
      dispatch(likeBook(newBook))
    } else {
      const set = new Set(book.liked )
      set.delete(userInfo._id)
      // console.log(Array.from(set))
      // unlike book
      const newBook = {
        ...book,
        liked: Array.from(set),
        stats: {
          ...book.stats,
        }
      }
      setBook(newBook)
      dispatch(unLikeBook(newBook))
    }
  }

  return (
    <>
        <div className="img-title-pos col-12 col-lg-8">
          <h1 className="book-title">{book.title}</h1>
          <ul className="list-inline font-green-bolder pt-3 mb-0">
            {book.rating !== 0 &&
                <li className="list-inline-item position-up">
                  {book.rating.toFixed(1)}
                </li>
            }
            <li className="list-inline-item">
              <RatingStar value={book.rating}/>
            </li>
            <li className="list-inline-item position-up">
              <i className="fa fa-user-o me-2" />{book.stats.numReviews} Reviews
            </li>
          </ul>
          <ul className="list-inline font-green-bolder mb-3">
            <li className="list-inline-item">
              <i className="fa-solid fa-user-pen" /> {book.authors.join(", ")}
            </li>
          </ul>
          <div className="pt-2 text-white fw-bolder"> About this book:</div>
          <div className="text-white book-description mb-3">
            {book.description}
          </div>
          <div className="pt-2">
            <a href="#writeReview">
              <button type="button" className="btn btn-primary" disabled={!userInfo}>Write Review</button>
            </a>
            <button
              type="button"
              className="btn btn-primary ms-4"
              onClick={likeBookHandler}
              disabled={!userInfo}
            >
              {
                Array.isArray(book.liked) && userInfo && !book.liked.includes(userInfo._id) &&
                <span>Like</span>
              }
              {
                Array.isArray(book.liked) && userInfo && book.liked.includes(userInfo._id) &&
                <span>Liked</span>
              }
              <span>({Array.isArray(book.liked) && book.liked.length})</span>
            </button>
          </div>
        </div>
        <div className="col-lg-4">
          <img src={book.image_url ? book.image_url : sampleCover} className="banner-height my-5" alt="book_image"/>
        </div>
    </>
  )
}
export default BookInfo