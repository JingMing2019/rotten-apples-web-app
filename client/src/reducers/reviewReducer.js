import {
  BOOK_DELETE_REVIEW_FAIL,
  BOOK_DELETE_REVIEW_REQUEST,
  BOOK_DELETE_REVIEW_SUCCESS
} from '../constants/bookConstants'

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DELETE_REVIEW_REQUEST:
      return { loading: true }
    case BOOK_DELETE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case BOOK_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}