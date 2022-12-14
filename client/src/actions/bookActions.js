import axios from 'axios'

import {
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_RECENT_REVIEWED_REQUEST,
  BOOK_RECENT_REVIEWED_SUCCESS,
  BOOK_RECENT_REVIEWED_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_LIST_DELETE_ONE,
  GOOGLE_BOOK_SAVE_REQUEST,
  GOOGLE_BOOK_SAVE_SUCCESS,
  GOOGLE_BOOK_SAVE_FAIL,
  GOOGLE_BOOK_SAVE_RESET,
  BOOK_TOP_RATED_REQUEST,
  BOOK_TOP_RATED_SUCCESS,
  BOOK_TOP_RATED_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_RESET,
  BOOK_USER_RECENT_REVIEWED_REQUEST,
  BOOK_USER_RECENT_REVIEWED_SUCCESS,
  BOOK_USER_RECENT_REVIEWED_FAIL,
  BOOK_DELETE_REQUEST, BOOK_DELETE_FAIL, BOOK_DELETE_SUCCESS,
} from '../constants/bookConstants'
import {BOOKS_API, GOOGLE_API} from "../constants/apiConstants";
import {logout} from "./userActions";

export const listBooks = () => async (
  dispatch
) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST })

    const { data } = await axios.get(`${BOOKS_API}`)

    dispatch({ type: BOOK_LIST_SUCCESS, payload: data.data })
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBookDetails = (id) => async (dispatch) => {
  try {
    // fetching data
    dispatch({ type: BOOK_DETAILS_REQUEST })
    const { data } = await axios.get(`${BOOKS_API}/${id}`)

    // fetch success
    dispatch({
      type: BOOK_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // fetch failed
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUserRecentReviewedBooks = (limit, uid) => async (
    dispatch,
    getState
) => {
  try {
    dispatch({ type: BOOK_USER_RECENT_REVIEWED_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${BOOKS_API}/recent-reviewed/${limit}/${uid}`, config)

    dispatch({
      type: BOOK_USER_RECENT_REVIEWED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOK_USER_RECENT_REVIEWED_FAIL,
      payload: message,
    })
  }
}

export const listRecentReviewedBooks = (limit) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_RECENT_REVIEWED_REQUEST })

    const { data } = await axios.get(`${BOOKS_API}/recent-reviewed/${limit}`)

    dispatch({
      type: BOOK_RECENT_REVIEWED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_RECENT_REVIEWED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const saveGoogleBook = (book) => async (dispatch) => {
  try {
    // fetching data
    dispatch({ type: GOOGLE_BOOK_SAVE_REQUEST })
    const { data } = await axios.put(`${GOOGLE_API}/books`, book)

    // fetch success
    dispatch({
      type: GOOGLE_BOOK_SAVE_SUCCESS,
      payload: data,
    })

    // reset book details state
    // dispatch({ type: BOOK_DETAILS_RESET })
  } catch (error) {
    // fetch failed
    dispatch({
      type: GOOGLE_BOOK_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const register = (book) => async (dispatch, getState) => {
  try {
    // fetching data
    dispatch({ type: BOOK_CREATE_REQUEST })

    // generate token
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(BOOKS_API, book, config)

    // fetch success
    dispatch({
      type: BOOK_CREATE_SUCCESS,
      payload: data,
    })

    // reset book details state
    // dispatch({ type: BOOK_DETAILS_RESET })
  } catch (error) {
    // fetch failed
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOK_CREATE_FAIL,
      payload: message,
    })
  }
}
export const resetCreateBook = () => async (dispatch) => {
  dispatch({ type: BOOK_CREATE_RESET })
}
export const resetSaveGoogleBook = () => async (dispatch) => {
  dispatch({ type: GOOGLE_BOOK_SAVE_RESET })
}

export const listTopRatedBooks = (limit) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_TOP_RATED_REQUEST })

    const { data } = await axios.get(`${BOOKS_API}/top/${limit}`)

    dispatch({
      type: BOOK_TOP_RATED_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOK_TOP_RATED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBook = (bookId) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // console.log(config)
    await axios.delete(`${BOOKS_API}/${bookId}`, config)

    dispatch({
      type: BOOK_LIST_DELETE_ONE,
      payload: bookId
    })

    dispatch({type: BOOK_DELETE_SUCCESS})

  } catch (error) {
    const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOK_DELETE_FAIL,
      payload: message,
    })
  }
}
