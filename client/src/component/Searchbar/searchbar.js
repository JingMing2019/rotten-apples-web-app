import React, {useCallback, useEffect, useState} from 'react'
import axios from "axios";
import {GOOGLE_API} from "../../constants/apiConstants";
import GoogleSearchBookList from "../google-search/googleSearchBookList";
import {useNavigate, useParams} from "react-router-dom";

const Searchbar = () => {
  const { keyword } = useParams()

  const navigate = useNavigate()

  const [keywordInput, setKeywordInput] = useState(keyword)
  const [books, setBooks] = useState(null)

  const searchByKeyword = useCallback(async (keyword) => {
    try {
      const response = await axios.get(`${GOOGLE_API}/search/${keyword}`);
      setBooks(response.data.data.items)
    } catch(error) {
      console.log(error)
    }
  }, [setBooks])

  // When performs search, navigate to '/search/keyword' html
  const searchButtonHandler = () => {
    navigate(`/search/${keywordInput}`)
  }

  useEffect(() => {
    if (keyword) {
      setKeywordInput(keyword)
      searchByKeyword(keyword).then(() => {})
    } else {
      setKeywordInput('')
      setBooks(null)
    }
      }, [searchByKeyword, keyword]
  )

  return (
    <>
      <div className='flex mt-2'>
        <div className="row">
          <div className="col-11">
            <input className="search-bar form-control"
                   type="text"
                   placeholder="Search"
                   value={keywordInput}
                   onChange={event => setKeywordInput(event.target.value)}/>
          </div>
          <div className="col-1">
            <button type="button"
                    className="btn btn-primary hero-btn"
                    onClick={searchButtonHandler}>
              Search
            </button>
          </div>
        </div>
      </div>
      {books && <GoogleSearchBookList books={books} />}
    </>
  )
}
export default Searchbar