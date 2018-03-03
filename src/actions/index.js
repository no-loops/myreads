import * as BooksAPI from '../utils/BooksAPI';

export const GET_ALL_BOOKS         = 'GET_ALL_BOOKS';
export const UPDATE_SHELF_FOR_BOOK = 'UPDATE_SHELF_FOR_BOOK';

export const getAllBooks = () => dispatch => (
 BooksAPI.getAll().then((books) => dispatch({
     type: GET_ALL_BOOKS,
     books
   }))
);

export const updateShelfOnBook = (book, shelf) => async dispatch => {
  await BooksAPI.update(book, shelf);

  BooksAPI.get(book.id).then(book => dispatch({
    type: UPDATE_SHELF_FOR_BOOK,
    book
  }))
};
