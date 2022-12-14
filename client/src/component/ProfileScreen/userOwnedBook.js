import React from 'react'
import { Row, Col } from 'react-bootstrap'
import UserOwnedBookElement from "./userOwnedBookElement";

const UserOwnedBook = ({ books }) => {
    return (
        <>
            <div className="mt-5 m-3 flex">
                <h1 className="text-black">Your Owned Books</h1>
            </div>
            <div className="container">
                <Row className="justify-content-start">
                    {books &&
                        books.map((book) => (
                            <Col key={book._id} sm={12} md={6} xl={3}
                                 className="d-flex align-items-stretch card-size">
                                <UserOwnedBookElement book={book}/>
                            </Col>
                        ))}
                </Row>
            </div>
        </>
    )
}
export default UserOwnedBook