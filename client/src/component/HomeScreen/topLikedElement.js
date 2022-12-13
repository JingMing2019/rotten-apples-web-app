import React from "react"
import { Link } from "react-router-dom"
import sampleCover from "../../vendors/img/book-cover-sample.png"

const TopLikedElement = ({ book }) => {
  return (
    <>
      <div className="m-3 col-12 col-md-3">
        <Link to={`/book/${book._id}`}>
          <div className="card homepage-card-img" >
            <img
              src={book.image_url ? book.image_url : sampleCover}
              alt="book_image_url"
              height="100%"

              className="border border-primary rounded-6"
            />
            <div>{book.name}</div>
          </div>
        </Link>
      </div>
    </>
  )
}
export default TopLikedElement
