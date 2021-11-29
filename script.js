let bookArr = [];

const newBook = () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const book = { id: new Date().getTime(), title, author };
  if (localStorage.getItem('data') !== null) {
    bookArr = JSON.parse(localStorage.getItem('data'));
    bookArr.push(book);
    const convert = JSON.stringify(bookArr);
    localStorage.setItem('data', convert);
    window.location.reload();
  } else {
    bookArr.push(book);
    const converted = JSON.stringify(bookArr);
    localStorage.setItem('data', converted);
    window.location.reload();
  }
};

// eslint-disable-next-line no-unused-vars
function removeBook(id) {
  const data = localStorage.getItem('data');
  const convertedBooks = JSON.parse(data);
  const remainingBooks = convertedBooks.filter((book) => book.id !== id);
  const removedBooks = JSON.stringify(remainingBooks);
  localStorage.setItem('data', removedBooks);
  window.location.reload();
}

const displayBookList = () => {
  const data = localStorage.getItem('data');
  const books = JSON.parse(data);
  document.querySelector('#book-list').innerHTML = 'No book saved';
  if (books.length === 0) {
    document.querySelector('#book-list').innerHTML = 'No book saved';
  } else {
    document.querySelector('#book-list').innerHTML = '';
    let booklist = '';
    books.forEach((book) => {
      booklist += `<div>
      <p class="tit">${book.title}</p>
      <p class="auth">${book.author}</p>
      <button class="delete" data-book-id = "${book.id}" id = "remove-button" onclick="removeBook(${book.id})">Remove</button>
      <hr>
      </div>`;
    });
    document.querySelector('#book-list').innerHTML = booklist;
  }
};

window.addEventListener('DOMContentLoaded', displayBookList);

document.querySelector('#book-form').addEventListener('submit', newBook);