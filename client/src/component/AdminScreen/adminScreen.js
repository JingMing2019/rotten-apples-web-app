import React, {useEffect} from 'react'
import appLogo from '../../vendors/img/apple.png'
import '../google-search/google-search.css'
import AppBookList from "./appBookList";
import {useDispatch, useSelector} from "react-redux";
import {listBooks} from "../../actions/bookActions";

const AdminScreen = () => {
    const dispatch = useDispatch()

    const searchedBooks = useSelector(state => state.bookList)
    const { books } = searchedBooks

    useEffect(() => {
        window.scrollTo(0, 0)
        dispatch(listBooks())
    }, [dispatch])

    return (
        <>
            <div>
                <section className="header">
                    <div className="flex">
                        <img className="mt-5" alt="webLogo" height="200px" src={appLogo}/>
                    </div>
                    {books && <AppBookList books={books} key={books._id} />}
                </section>
            </div>
        </>
    )
}
export default AdminScreen