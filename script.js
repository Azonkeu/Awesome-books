class Book {
  booky = { id: new Date().getTime() };

  constructor(title, author, isbn = this.booky.id) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

/* eslint max-classes-per-file: off */
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn !== isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

/* eslint max-classes-per-file: off */
class UserInterface {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UserInterface.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <p class="tit">${book.title}</p>
      <p class="auth">${book.author}</p>
      <p class="hide">${book.isbn}</p>
      <button class="delete"><a href="#" class="delete">Remove</a></button>
      <hr>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.section1');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', UserInterface.displayBooks);

document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  if (title === '' || author === '') {
    UserInterface.showAlert('Please fill in all fields', 'danger');
  } else {
    const book = new Book(title, author);
    UserInterface.addBookToList(book);

    Store.addBook(book);

    UserInterface.showAlert('Book Added', 'success');

    UserInterface.clearFields();
  }
});

document.querySelector('#book-list').addEventListener('click', (e) => {
  UserInterface.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  UserInterface.showAlert('Book Removed', 'success');
});