const myLibrary = [];

function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, numberOfPages, read) {
  let newBook = new Book(title, author, numberOfPages, read);

  myLibrary.push(newBook);
  // take params, create a book then store it in the array
}
