import React from 'react'
import UserLikedBookElement from './userLikedBookElement'
import { Row, Col } from 'react-bootstrap'

const UserLikedBook = ({ books }) => {
  return (
    <>
        <div className="mt-5 m-3 flex">
            <h1 className="text-black">Your Liked Books</h1>
        </div>
        <div className="container">
          <Row className="justify-content-between">
            {books &&
              books.map((book) => (
                <Col key={book._id} sm={12} md={6} xl={3}
                  className="d-flex align-items-stretch card-size">
                  <UserLikedBookElement book={book}/>
                </Col>
              ))}
          </Row>
        </div>
    </>
  )
}
export default UserLikedBook