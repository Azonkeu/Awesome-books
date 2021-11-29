const booky = {id: new Date().getTime() };

class Book {
  constructor(title, author, isbn = booky.id) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UserInterface {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UserInterface.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p class="hide">${book.isbn}</p>
      <button><a href="#" class="btn btn-danger btn-sm delete">Remove</a></button>
    `;

    list.appendChild(row);
  }
