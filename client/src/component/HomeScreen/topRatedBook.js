import React, { useEffect } from "react"
import TopRatedElement from "./topRatedElement"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { listTopRatedBooks } from "../../actions/bookActions"

const TopRatedBook = () => {
  const dispatch = useDispatch()
  const bookTopRated = useSelector((state) => state.bookTopRated)
  const { books } = bookTopRated

  useEffect(() => {
    dispatch(listTopRatedBooks(4))
  }, [dispatch])

  return (
    <>
      <div className="mt-5 m-3 flex">
        <h1 className="text-black">Most Popular</h1>
      </div>
      <Row className="justify-content-center">
        {books &&
          books.map((book) => (
            <Col key={book._id} sm={12} md={6} lg={3}>
              <TopRatedElement book={book} />
            </Col>
          ))}
      </Row>
    </>
  )
}
export default TopRatedBook
