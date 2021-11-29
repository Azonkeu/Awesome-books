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
