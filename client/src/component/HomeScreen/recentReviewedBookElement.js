import React from 'react'
import { Link } from 'react-router-dom'
import sampleCover from "../../vendors/img/book-cover-sample.png"

const RecentReviewedBookElement = ({ book }) => {
  return (
    <>
      <div className="m-3">
        <Link to={`/book/${book._id}`}>
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
      </div>
    </>
  )
}
export default RecentReviewedBookElement
