# Rotten Apples 
--------Book review web app--------

### Deployment
- server on Heroku: https://rotten-apples-node-server-app.herokuapp.com/
- client on Netlify: https://rotten-apples-react-web-app.netlify.app/

### Run the program
- Server: `cd server` and run `npm start`
- Client: `cd client` and run `npm start`

### Main Pages
- [Home page](https://rotten-apples-react-web-app.netlify.app/): display most popular and recent reviewed books
- [Search page](https://rotten-apples-react-web-app.netlify.app/search): search books from [Google Books API v1](https://developers.google.com/books/docs/overview#books_api_v1), by keyword in title
- [Book details page](https://rotten-apples-react-web-app.netlify.app/book/6392ff24d02fe9c8cb2f28eb): logged-in users can write reviews and like book
- [Register page](https://rotten-apples-react-web-app.netlify.app/register)
- [Login page](https://rotten-apples-react-web-app.netlify.app/login)
- User profile page
- Edit profile page

### User Roles
- User: search Google Books, read book details and reviews. 
- Reader: like book, write book reviews, delete his/her own reviews.
- Writer: add books to app own database.
- Admin: delete any book reviews.

### UML Class Diagram
- [UML Class for Rotten Apples](https://lucid.app/lucidchart/26f5a064-924e-4875-af93-f73b2b875baa/edit?view_items=6aya1aSV1m~M&invitationId=inv_5ccc50ea-0f4e-4e97-9a4c-1e93a29dd25c)

