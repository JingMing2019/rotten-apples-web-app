import React, {useEffect} from 'react'
import GoogleSearchListItem from './googleSearchListItem'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetSaveGoogleBook } from '../../actions/bookActions'
import './google-search.css'

const GoogleSearchBookList = ({books}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const saveGoogleBook = useSelector(state => state.saveGoogleBook)
  const { book: savedBook } = saveGoogleBook

  useEffect(() => {
    if (savedBook) {
      navigate(`/book/${savedBook._id}`);
      dispatch(resetSaveGoogleBook());
    }
  }, [dispatch, savedBook, navigate])

  return (
    <div className="container">
      <ul className="list-group">
        {books && <h6 className="text-white my-3 pt-3">Results from Google Books...</h6>}
        {
            books.map(
              book => (<GoogleSearchListItem book={book} key={book.id}/>)
            )
        }
      </ul>
    </div>
  )
}

export default GoogleSearchBookList