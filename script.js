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

    const row = document.createElement('div');
    row.className = 'row';
    row.id = 'rowid';
    row.innerHTML = `
      <div class="booBlock" id="boo">
      <p class="tit">"${book.title}"</p>
      <p class="by">by</p>
      <p class="auth">${book.author}</p>
      <p class="hide">${book.isbn}</p>
      <button class="delete"><a href="#" class="delete">Remove</a></button>
      </div>
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

const body = document.getElementById('body');
body.onload = function color() {
  const colorNew = document.getElementById('list');
  colorNew.classList.add('color');
};

const contact = document.getElementById('contact');
const adding = document.getElementById('adding');

const list = document.getElementById('list');
list.onclick = function color() {
  const colorNew = document.getElementById('list');
  colorNew.classList.add('color');
  adding.classList.remove('color');
  contact.classList.remove('color');
};
list.addEventListener('click', () => {
  document.getElementById('cont').style.display = 'none';
  document.getElementById('book-form').style.display = 'none';
  document.getElementById('book-list').style.display = 'flex';
  document.getElementById('rowid').style.display = 'flex';
  document.getElementById('awe').style.display = 'flex';
  document.getElementById('spa').style.display = 'none';
});

adding.onclick = function colorx() {
  const colorBlue = document.getElementById('adding');
  colorBlue.classList.add('color');
  list.classList.remove('color');
  contact.classList.remove('color');
};
adding.addEventListener('click', () => {
  document.getElementById('book-form').style.display = 'flex';
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('rowid').style.display = 'none';
  document.getElementById('awe').style.display = 'none';
  document.getElementById('spa').style.display = 'none';
  document.getElementById('cont').style.display = 'none';
});

contact.onclick = function colorx() {
  const colorNe = document.getElementById('contact');
  colorNe.classList.add('color');
  list.classList.remove('color');
  adding.classList.remove('color');
};

contact.addEventListener('click', () => {
  document.getElementById('cont').style.display = 'flex';
  document.getElementById('book-form').style.display = 'none';
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('rowid').style.display = 'none';
  document.getElementById('awe').style.display = 'none';
  document.getElementById('spa').style.display = 'none';
  document.getElementById('info').style.display = 'none';
});

/* eslint-disable */
const result = luxon.DateTime.now().toLocaleString(luxon.DateTime.DATETIME_MED_WITH_SECONDS);

const timing = document.getElementById('outtime');
timing.innerHTML = result;