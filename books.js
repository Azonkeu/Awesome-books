/* eslint-disable */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
/* eslint-enable */
class Build {
  // Create array to store elements
  static getFromLocalStore() {
    let book;
    if (localStorage.getItem('book')) {
      book = JSON.parse(localStorage.getItem('book'));
    } else {
      book = [];
    }
    return book;
  }

  // Add to LocalStorage
  static addToLocalStore(book) {
    let storedBooks = Build.getFromLocalStore();// eslint-disable-line
    storedBooks.push(book);
    localStorage.setItem('book', JSON.stringify(storedBooks));
  }

  // Add book to array
  static addToarray() {
    const arrayBooks = Build.getFromLocalStore();
    arrayBooks.forEach((book) => Build.drawPage(book));
  }

  // Remove from LocalStorage
  static removeBook(target, index) {
    let storedBooks = Build.getFromLocalStore();// eslint-disable-line
    storedBooks.splice(index, 1);
    localStorage.setItem('book', JSON.stringify(storedBooks));
    target.parentElement.parentElement.remove();
  }

  // Display on a page
  static drawPage(book) {
    const div = document.createElement('div');
    div.classList.add('book-container');
    div.innerHTML = `
      <div class="heading">
        <h4>"${book.title}" By ${book.author}</h4>
      </div>
      <div class="button heading">
        <button class="remove">Remove</button>
      </div>`;
    const atPlace = document.querySelector('#bookList');
    atPlace.appendChild(div);
  }

  static clearForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static fillMessage() {
    const message = document.createElement('span');
    message.classList.add('message');
    const messageParent = document.querySelector('#submitBtn');
    const messageSibling = document.querySelector('#addBook');
    messageParent.insertBefore(message, messageSibling);
    message.textContent = 'Please fill all fields';
    setTimeout(() => document.querySelector('.message').remove(), 4000);
  }
}

// Starts here
Build.addToarray();

// Add book from Screen
const addBook = document.querySelector('#addBook');
addBook.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  if (title.value === '' || author.value === '') {
    Build.fillMessage();
  } else {
    const newBook = new Book(title.value, author.value);
    Build.drawPage(newBook);
    Build.clearForm();
    Build.addToLocalStore(newBook);
  }
});

// Remove book from a list
const removeBtn = Array.from(document.querySelectorAll('.remove'));
removeBtn.forEach((btn) => btn.addEventListener('click', (e) => {
  Build.removeBook(e.target, removeBtn.indexOf(btn));
}));
