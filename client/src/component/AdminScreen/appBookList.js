import React from 'react'
import AppBookListItem from "./appBookListItem";

const AppBookList = ({books}) => {
    return (
        <div className="container">
            <ul className="list-group">
                {books && <h3 className="text-white my-3 pt-3">Books from app database...</h3>}
                {
                    books.map(
                        book => (<AppBookListItem book={book} key={book._id}/>)
                    )
                }
            </ul>
        </div>
    )
}

export default AppBookList