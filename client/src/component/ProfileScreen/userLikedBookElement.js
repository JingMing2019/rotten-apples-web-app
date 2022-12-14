import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import sampleCover from "../../vendors/img/book-cover-sample.png"

const UserLikedBookElement = ({ book }) => {
  return (
    <Card className="my-2 p-2 border-0 text-center same-width">
      <Link to={`/book/${book.book}`}>
        <Card.Img className="profile-page-card-img" variant="top" src={book.image_url ? book.image_url : sampleCover} alt=""/>
      </Link>
      <Card.Body>
        <Card.Title className="fs-5 text-truncate">{book.title}</Card.Title>
        <Card.Text>
          <i className="fa-solid fa-heart"/>
          &nbsp;liked&nbsp;
          <i className="fa-solid fa-heart"/>
        </Card.Text>
        <Link to={`/book/${book.book}`}>
          <Button variant="primary">Review Again</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
export default UserLikedBookElement