import React from "react"
import { Link } from "react-router-dom"
import sampleCover from "../../vendors/img/book-cover-sample.png"

const TopRatedElement = ({ book }) => {
  return (
    <>
      <div className="m-3">
        <Link to={`/book/${book._id}`}>
          <div className="card homepage-card-img" >
            <img
              src={book.image_url ? book.image_url : sampleCover}
              alt="book_image_url"
            />
          </div>
        </Link>
        <div className="fw-bold text-truncate">
          {book.title}
        </div>
        {book.rating && <div className="fw-bold">{book.rating.toFixed(1)}</div>}
      </div>
    </>
  )
}
export default TopRatedElement
