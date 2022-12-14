import React from 'react'
import BookInfo from './bookInfo'

const BookDetail = ({ book }) => {

  return (
    <>
      <section className="header">
        <div className="container">
          <div className="row justify-content-around align-items-center">
            {book && <BookInfo bookInfo={book}/>}
          </div>
        </div>
      </section>
    </>

  )
}

export default BookDetail

