import * as ACTIONS from '../actions'

// Default export, not named export because there is only one object 'books' in the
// redux store.
export default function books (state = {}, action) {
  switch (action.type) {
    case ACTIONS.GET_ALL_BOOKS :
    return {
      ...state,
      books: action.books
    }

    case ACTIONS.UPDATE_SHELF_FOR_BOOK:
    return {
      ...state,
      books: state.books.map((book) => {
        return (book.id === action.book.id)? action.book:book;
      })
    };

    default :
    return state;
  }
}
