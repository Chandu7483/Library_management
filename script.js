let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");
let message = document.getElementById("message");

function createBookItem(book) {

    let bookDiv = document.createElement("div");
    bookDiv.classList.add("result-item");

    let link = document.createElement("a");

    // ✅ OpenLibrary book page link
    if (book.key) {
        link.href = "https://openlibrary.org" + book.key;
    } else {
        link.href = "https://www.google.com/search?q=" + encodeURIComponent(book.title + " book");
    }

    link.target = "_blank";

    let image = document.createElement("img");

    if (book.cover_i) {
        image.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    } else {
        image.src = "https://via.placeholder.com/150x220?text=No+Image";
    }

    let title = document.createElement("h5");
    title.textContent = book.title;

    link.appendChild(image);
    bookDiv.appendChild(link);
    bookDiv.appendChild(title);

    searchResults.appendChild(bookDiv);
}

function searchBooks() {

    let query = searchInput.value.trim();

    if (query === "") {
        message.textContent = "Please enter a book name";
        return;
    }

    searchResults.innerHTML = "";
    message.textContent = "";
    spinner.classList.remove("d-none");

    fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then(data => {

            spinner.classList.add("d-none");

            if (data.docs.length === 0) {
                message.textContent = "No results found";
                return;
            }

            data.docs.slice(0, 20).forEach(book => {
                createBookItem(book);
            });

        })
        .catch(error => {
            spinner.classList.add("d-none");
            message.textContent = "Something went wrong!";
        });
}

searchBtn.addEventListener("click", searchBooks);

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchBooks();
    }
});