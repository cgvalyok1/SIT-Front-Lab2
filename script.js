const apiKey = "d7722512";
const apiUrl = "https://www.omdbapi.com/";

window.onload = () => {
    document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("movietitle").value;
    searchMovie(title);
    });
};

function searchMovie(title) {
    return fetch(`${apiUrl}?t=${title}&apikey=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.Response === "False") {
                    throw new Error(data.Error);
                }
                displayMovie(data);
            })
            .catch(error => {
                displayError(error.message);
            });
}

function displayMovie(movie) {
    const results = document.getElementById("results");
    const movieInfo = `
        <h2>${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <img src="${movie.Poster}" alt="Poster">
    `;
    results.innerHTML = movieInfo;
}

function displayError(message) {
    const results = document.getElementById("results");
    results.innerHTML = `<p class="error">${message}</p>`;
}