import React from 'react'
import {Link} from 'react-router-dom'
import sampleCover from "../../vendors/img/book-cover-sample.png"
import {useDispatch} from "react-redux";
import {deleteBook} from "../../actions/bookActions";

// `book` is under the Google books format
const AppBookListItem = ({ book }) => {
    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteBook(book._id))
    }

    return (
        <>
            <li className="text-white list-group-item">
                <div className="homepage-list-child row justify-content-between align-items-center">
                    <div className="col-12 col-md-3">
                        <Link to={`/book/${book._id}`}>
                            <img className="google-search-img" src={book.image_url? book.image_url : sampleCover} alt="book thumbnail"/>
                        </Link>
                    </div>
                    <div className="text py-2 pe-4 col-md-9">
                        <div className="fw-bold fs-4">
                            {book.title}
                            {book.subtitle && <span>{": " + book.subtitle}</span>}
                            <Link to={"#"}>
                                <i onClick={deleteHandler} className="fas fa-remove fa-pull-right text-danger"/>
                            </Link>
                        </div>
                        <div className="mt-2 mb-1 text-primary fst-italic fw-bold">{book.authors ? book.authors.join(", ") : ""}</div>
                        <div className="mb-2">
                            {book.published_date}
                            {book.page && " | " + book.page + " pages"}
                        </div>
                        {book.description &&
                            <>
                                <div className="fw-bold pt-2">About this book:</div>
                                <p className="lg search-book-description">
                                    {" " + book.description}
                                </p>
                            </>
                        }
                    </div>
                </div>
            </li>
        </>
    )
}

export default AppBookListItem