const createBookBtn = document.querySelector("#create-book"),
  addButton = document.querySelector("#library__create-book"),
  closeButton = document.querySelector("#close-button");

const library = (function () {
  const myLibrary = [];

  function add(book) {
    myLibrary.push(book);
  }

  function remove(book) {
    const index = myLibrary.findIndex((a) => a.id === book.id);

    myLibrary.splice(index, 1);
  }

  function latest() {
    let myLibraryCopy = [...myLibrary];

    return myLibraryCopy.pop();
  }

  return {
    add,
    remove,
    latest,
  };
})();

class Book {
  author;
  title;
  numberOfPages;
  genre;
  read;
  coverFile;

  constructor(author, title, numberOfPages, genre, read, coverFile) {
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.genre = genre;
    this.read = read;
    this.coverFile = coverFile;
    this.id = crypto.randomUUID();
  }
}

function createBook(e) {
  bookTitleCheck(e);

  createBookInfo();

  ui.bookFormat(library.latest());

  ui.close();

  function bookTitleCheck(e) {
    const form = document.querySelector("#library__book__form"),
      titleValue = document.querySelector("#title");

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
  }

  function createBookInfo() {
    const readValue = document.querySelector('input[name="read"]:checked'),
      coverInput = document.querySelector("#book-cover"),
      authorValue = document.querySelector("#author"),
      titleValue = document.querySelector("#title"),
      numberOfPagesValue = document.querySelector("#pages"),
      genreValue = document.querySelector("#genre");

    const coverFile = coverInput.files[0];

    let newBook = new Book(
      authorValue.value,
      titleValue.value,
      numberOfPagesValue.value,
      genreValue.value,
      readValue.value,
      coverFile,
    );

    library.add(newBook);
  }
}

const ui = (function () {
  const form = document.querySelector("#library__book__form"),
    dialog = document.querySelector("#library__book__dialog");

  function openForm() {
    dialog.showModal();
  }

  function closeForm() {
    dialog.close();
    form.reset();
  }

  function bookFormat(book) {
    const template = document.querySelector("#book-template");
    const clone = template.content.cloneNode(true);
    const libraryBlock = document.querySelector("#library-block");

    const bookDiv = clone.querySelector(".library__book");
    bookDiv.querySelector(".library__book__title").textContent =
      bookDetailsCheck(book, "title");
    bookDiv.querySelector(".library__book__author").textContent =
      bookDetailsCheck(book, "author");
    bookDiv.querySelector(".library__book__pages").textContent =
      bookDetailsCheck(book, "numberOfPages");
    bookDiv.querySelector(".library__book__genre").textContent =
      bookDetailsCheck(book, "genre");

    const closeBtn = bookDiv.querySelector(".library__book__delete-button");
    closeBtn.addEventListener("click", () => {
      bookDiv.remove();
      library.remove(book);
    });

    const readBtn = bookDiv.querySelector(".library__book__toggle-read-button");
    if (book.read === "yes") {
      readBtn.textContent = "Read";
      readBtn.classList.remove("library__book__toggle-read-button--unread");
    } else {
      readBtn.textContent = "Not Read";
      readBtn.classList.add("library__book__toggle-read-button--unread");
    }
    readBtn.addEventListener("click", toggleRead);

    const bookCover = bookDiv.querySelector(".library__book__image");
    if (book.coverFile) {
      bookCover.src = URL.createObjectURL(book.coverFile);
    } else {
      bookCover.src = "assets/images/image-no-image.jpg";
    }

    libraryBlock.append(bookDiv);

    function toggleRead(e) {
      if (e.target.textContent !== "Not Read") {
        e.target.textContent = "Not Read";
        e.target.classList.add("library__book__toggle-read-button--unread");
      } else {
        e.target.textContent = "Read";
        e.target.classList.remove("library__book__toggle-read-button--unread");
      }

      book.read = book.read === "yes" ? "no" : "yes";
    }

    function bookDetailsCheck(book, property) {
      if (book[property] === null || book[property].trim() === "") {
        return "Unknown";
      }
      return book[property];
    }
  }

  return {
    open: openForm,
    close: closeForm,
    bookFormat,
  };
})();

// Library Logic
createBookBtn.addEventListener("click", createBook);
addButton.addEventListener("click", ui.open);
closeButton.addEventListener("click", ui.close);
