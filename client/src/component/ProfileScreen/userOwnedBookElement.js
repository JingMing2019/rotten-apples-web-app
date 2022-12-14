import React from 'react'
import { Link } from 'react-router-dom'
import sampleCover from "../../vendors/img/book-cover-sample.png"
import {deleteBook} from "../../actions/bookActions";
import {useDispatch} from "react-redux";

const UserOwnedBookElement = ({ book }) => {
  const dispatch = useDispatch()

  const deleteHandler = () => {
    dispatch(deleteBook(book.book))
  }

  return (
    <>
      <div className="m-3">
        <Link to={`/book/${book.book}`}>
          <div className="card homepage-card-img">
            <img
              src={book.image_url ? book.image_url : sampleCover}
              alt="book_image_url"
            />
          </div>
        </Link>
        <div className="fw-bold text-truncate">
          {book.title}
        </div>
        <button onClick={deleteHandler} type="reset" className="btn bg-primary mt-2">Delete</button>
      </div>
    </>
  )
}
export default UserOwnedBookElement
