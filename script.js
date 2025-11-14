let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");
let messageEl = document.getElementById("message");
let searchResultsEl = document.getElementById("searchResults");
let headingEl = document.getElementById("h1");

function createAndAppendSearchResults(search_results) {
    if (search_results.length < 1) {
        messageEl.textContent = "No Results Found";
        searchResultsEl.textContent = "";
        headingEl.textContent = "";
    } else {
        searchResultsEl.textContent = "";
        messageEl.textContent = "";
        headingEl.textContent = "Popular Books";
        searchResultsEl.appendChild(headingEl);

        for (let eachItem of search_results) {
            let title = eachItem.title;
            let image = eachItem.imageLink;
            let author = eachItem.author;

            // ✔ FIX (Google Books search link)
            let link = "https://www.google.com/search?q=" + encodeURIComponent(title + " book");

            let imgEl = document.createElement("img");
            let textEl = document.createElement("p");
            let divEl = document.createElement("div");
            let linkEl = document.createElement("a");

            divEl.classList.add("result-item");
            imgEl.classList.add("img-fluid");

            imgEl.setAttribute("src", image);
            textEl.textContent = author;

            linkEl.setAttribute("href", link);
            linkEl.setAttribute("target", "_blank");

            linkEl.appendChild(imgEl);

            divEl.appendChild(linkEl);
            divEl.appendChild(textEl);

            searchResultsEl.appendChild(divEl);

            console.log(eachItem);
        }
    }
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        let searchInputVal = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputVal;

        fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let { search_results } = jsonData;
                createAndAppendSearchResults(search_results);
                spinnerEl.classList.add("d-none");
            });
    }
});
