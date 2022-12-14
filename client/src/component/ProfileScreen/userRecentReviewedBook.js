import React, { useEffect } from "react"
import ReviewElement from "../HomeScreen/reviewElement"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { listUserRecentReviewedBooks } from "../../actions/bookActions"

const UserRecentReviewedBook = () => {
  const dispatch = useDispatch()
  const bookUserRecentReviewed = useSelector((state) => state.bookUserRecentReviewed)
  const { books } = bookUserRecentReviewed
    console.log(books)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listUserRecentReviewedBooks(4))
    } else {
      // no render the recent reviewed book
    }
  }, [dispatch, userInfo])
  return (
    <>
        <div className="mt-5 m-3 flex">
            <h1 className="text-black">Your Recent Reviewed Books</h1>
        </div>
        <div className="container">
          <Row className="justify-content-between">
            {books &&
              books.map((book) => (
                <Col key={book._id} sm={12} md={6} xl={3}>
                  <ReviewElement book={book} />
                </Col>
              ))}
          </Row>
        </div>
    </>
  )
}
export default UserRecentReviewedBook
