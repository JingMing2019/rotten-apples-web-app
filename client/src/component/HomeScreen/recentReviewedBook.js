import React, { useEffect } from "react"
import RecentReviewedBookElement from "./recentReviewedBookElement"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { listRecentReviewedBooks } from "../../actions/bookActions"

const RecentReviewedBook = () => {
  const dispatch = useDispatch()
  const bookRecentReviewed = useSelector(
    (state) => state.bookRecentReviewed
  )
  const { books } = bookRecentReviewed

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listRecentReviewedBooks(4))
    } else {
      // no render the recent reviewed book
    }
  }, [dispatch, userInfo])

  return (
    <>
        <div className="mt-5 m-3 flex">
            <h1 className="text-black">Recent Reviewed</h1>
        </div>
        <div className="container">
          <Row className="justify-content-between">
            {books &&
              books.map((book) => (
                <Col key={book._id} sm={12} md={6} lg={3}>
                  <RecentReviewedBookElement book={book} />
                </Col>
              ))}
          </Row>
        </div>
    </>
  )
}
export default RecentReviewedBook
