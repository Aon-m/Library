const addButton = document.querySelector("#library__create-book"),
  createBookBtn = document.querySelector("#create-book"),
  dialog = document.querySelector("#library__book__dialog"),
  authorValue = document.querySelector("#author"),
  titleValue = document.querySelector("#title"),
  numberOfPagesValue = document.querySelector("#pages"),
  genreValue = document.querySelector("#genre"),
  closeButton = document.querySelector("#close-button"),
  libraryBlock = document.querySelector("#library-block"),
  form = document.querySelector("#library__book__form"),
  template = document.querySelector("#book-template");

// Form display
createBookBtn.addEventListener("click", createBook);
closeButton.addEventListener("click", closeDialog);
addButton.addEventListener("click", openDialog);

const myLibrary = [];

function Book(author, title, numberOfPages, genre, read) {
  this.author = author;
  this.title = title;
  this.numberOfPages = numberOfPages;
  this.genre = genre;
  this.read = read;

  this.id = crypto.randomUUID();
}

function addBookToJsLibrary(Book) {
  myLibrary.push(Book);
}

function addBookToHtmlLibrary() {
  let myLibraryCopy = [...myLibrary];

  let latestBook = myLibraryCopy.pop();

  bookFormat(latestBook);
}

function createBookInfo() {
  const readValue = document.querySelector('input[name="read"]:checked');
  const coverInput = document.querySelector("#book-cover");
  const coverFile = coverInput.files[0];

  let newBook = new Book(
    authorValue.value,
    titleValue.value,
    numberOfPagesValue.value,
    genreValue.value,
    readValue.value
  );

  newBook.coverFile = coverFile;

  addBookToJsLibrary(newBook);
}

function createBook(e) {
  e.preventDefault();

  if (titleValue.value.trim() === "") {
    titleValue.setCustomValidity("Please enter a proper title");
    form.reportValidity();
    return;
  }

  titleValue.setCustomValidity("");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  createBookInfo();

  addBookToHtmlLibrary();

  closeDialog();
}

function closeDialog() {
  dialog.close();
  form.reset();
}

function openDialog() {
  dialog.showModal();
}

function bookFormat(book) {
  const clone = template.content.cloneNode(true);

  const bookDiv = clone.querySelector(".library__book");
  bookDiv.querySelector(".library__book__title").textContent = bookDetailsCheck(
    book,
    "title"
  );
  bookDiv.querySelector(".library__book__author").textContent =
    bookDetailsCheck(book, "author");
  bookDiv.querySelector(".library__book__pages").textContent = bookDetailsCheck(
    book,
    "numberOfPages"
  );
  bookDiv.querySelector(".library__book__genre").textContent = bookDetailsCheck(
    book,
    "genre"
  );

  const closeBtn = bookDiv.querySelector(".library__book__delete-button");
  closeBtn.addEventListener("click", () => {
    bookDiv.remove();
    removeBook(book);
  });

  const readBtn = bookDiv.querySelector(".library__book__toggle-read-button");
  readBtn.textContent = "Read";
  readBtn.addEventListener("click", toggleRead);

  const bookCover = bookDiv.querySelector(".library__book__image");
  if (book.coverFile) {
    bookCover.src = URL.createObjectURL(book.coverFile);
  } else {
    bookCover.src = "assets/images/image-no-image.jpg";
  }

  libraryBlock.append(bookDiv);

  function toggleRead(e) {
    e.target.classList.toggle("library__book__toggle-read-button--unread");
    if (e.target.textContent !== "Not Read") {
      e.target.textContent = "Not Read";
    } else {
      e.target.textContent = "Read";
    }
  }
}

function bookDetailsCheck(book, property) {
  if (book[property] === null || book[property].trim() === "") {
    return "Unknown";
  }
  return book[property];
}

function removeBook(book) {
  const index = myLibrary.findIndex((a) => a.id === book.id);

  myLibrary.splice(index, 1);
}

function readStatus(book) {
  if (book.read === "yes") return "Has Been Read";
  else return "Has Not Been Read";
}
