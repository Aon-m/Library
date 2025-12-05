const addButton = document.querySelector("#library__book--add"),
  createBookBtn = document.querySelector("#create-book"),
  form = document.querySelector("#library__book__form"),
  authorValue = document.querySelector("#author"),
  titleValue = document.querySelector("#title"),
  numberOfPagesValue = document.querySelector("#pages"),
  genreValue = document.querySelector("#genre"),
  closeButton = document.querySelector("#close-button");

// Form display
createBookBtn.addEventListener("click", createBook);
closeButton.addEventListener("click", closeForm);
addButton.addEventListener("click", openForm);

const myLibrary = [];

function Book(author, title, numberOfPages, genre, read) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.genre = genre;
  this.read = read;

  this.id = crypto.randomUUID();
}

function addBookToLibrary() {
  const readValue = document.querySelector('input[name="read"]:checked');

  let newBook = new Book(
    authorValue.value,
    titleValue.value,
    numberOfPagesValue.value,
    genreValue.value,
    readValue.value
  );

  myLibrary.push(newBook);
}

function createBook() {
  if (titleValue.value.trim() === "") return;

  addBookToLibrary();

  closeForm();
}

function closeForm() {
  form.style.display = "none";

  authorValue.value = null;
  titleValue.value = null;
  numberOfPagesValue.value = null;
  genreValue.value = null;
  readValue.value = null;
}

function openForm() {
  form.style.display = "flex";
}
