import React from 'react'
import { Link } from 'react-router-dom'
import './google-search.css'
import { saveGoogleBook } from '../../actions/bookActions'
import { useDispatch, } from 'react-redux'
import sampleCover from "../../vendors/img/book-cover-sample.png"

// `book` is under the Google books format
const GoogleSearchListItem = ({ book }) => {
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(saveGoogleBook(book))
  }

  const convertDateShortToFull = (publishedDate) => new Date(publishedDate).toLocaleString('en-CA', {month: 'short', day: 'numeric', year: 'numeric'});

  return (
    <>
      <Link to="#" onClick={clickHandler}>
        <li className="text-white list-group-item">
          <div className="homepage-list-child row justify-content-between align-items-center">
            <div className="col-12 col-md-3">
              <img className="google-search-img" src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : sampleCover} alt="book thumbnail"/>
            </div>
            <div className="text py-2 pe-4 col-md-9">
              <div className="fw-bold fs-4">
                {book.volumeInfo.title}
                {book.volumeInfo.subtitle && <span>{": " + book.volumeInfo.subtitle}</span>}
              </div>
              <div className="mt-2 mb-1 text-primary fst-italic fw-bold">{book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : ""}</div>
              <div className="mb-2">
                {book.volumeInfo.publishedDate && convertDateShortToFull(book.volumeInfo.publishedDate)}
                {book.volumeInfo.pageCount && " | " + book.volumeInfo.pageCount + " pages"}
              </div>
              {book.volumeInfo.description &&
                  <>
                    <div className="fw-bold pt-2">About this book:</div>
                    <p className="lg search-book-description">
                      {" " + book.volumeInfo.description}
                    </p>
                  </>
              }
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default GoogleSearchListItem