import React, { useEffect } from "react"
import RecentReviewedBookElement from "../HomeScreen/recentReviewedBookElement"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { listUserRecentReviewedBooks } from "../../actions/bookActions"

const UserRecentReviewedBook = ( {uid} ) => {
    const dispatch = useDispatch()
    const bookUserRecentReviewed = useSelector((state) => state.bookUserRecentReviewed)
    const { books } = bookUserRecentReviewed

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const deleteBook = useSelector(state => state.deleteBook)
    const { success: deleteBookSuccess } = deleteBook

    useEffect(() => {
    if (userInfo) {
      dispatch(listUserRecentReviewedBooks(4, uid ? uid : userInfo._id))
    } else {
      // no render the recent reviewed book
    }
    }, [dispatch, userInfo, deleteBookSuccess])
    return (
    <>
        <div className="mt-5 m-3 flex">
            <h1 className="text-black">
                {uid ? "Recent Reviewed Books" : "Your Recent Reviewed Books"}
            </h1>
        </div>
        <div className="container">
          <Row className="justify-content-start">
            {books &&
              books.map((book) => (
                <Col key={book._id} sm={12} md={6} xl={3}>
                  <RecentReviewedBookElement book={book} />
                </Col>
              ))}
          </Row>
        </div>
    </>
    )
}


export default UserRecentReviewedBook
