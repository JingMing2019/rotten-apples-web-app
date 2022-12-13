import React from 'react'
import './userprofile.css'
import LetterAvatars from '../EditProfile/letterAvatars'
import { Card } from 'react-bootstrap'


const UserCard = ({
                      profile = {
                          '_id': '34238432784901',
                          'name': 'Alice Wonderland',
                          'firstname': 'Alice',
                          'lastname': 'Wonderland',
                          'email': 'alice@134.com',
                          'role': 'reader',
                          'bio': 'I love reading!',
                          'location': 'San Jose',
                      }
                  }) => {

    return (
        <>
            <Card className="user-card user-card-flex">
                <Card.Body className="m-5">
                    <Card.Title className="other-user-avatar">
                        <LetterAvatars name={profile.name}/>
                    </Card.Title>
                    <Card.Title className="user-card-title text-black">{profile.name}
                    </Card.Title>
                    <Card.Text className="text-black">{profile.bio}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
export default UserCard