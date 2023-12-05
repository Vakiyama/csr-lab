const movieInput_input = document.querySelector("input");
const myMovieList_ul = document.querySelector("ul");
const addMovie_button = document.querySelector("#add-movie-button");
const filter_input = document.querySelector("#filter");

/* 
    * Movie:
    * - title: string
    * - timesWatched: number
*/

const movieHistory = [];

function handleAddMovie() {
    const inputText = movieInput_input.value;
    addMovieToHistory(inputText);
    clearMovieInput();
}

function incrementMovieHistory(movieIndex) {
    movieHistory[movieIndex].timesWatched += movieHistory[movieIndex].timesWatched + 1;
    renderMovies(movieHistory);
    return;
}


function addMovieToHistory(inputText) {
    const movieIndex = movieHistory.findIndex(movie => movie.title === inputText);
    if (movieIndex !== -1) {
        incrementMovieHistory(movieIndex);
    } else {
        movieHistory.push({
            title: inputText,
            timesWatched: 0,
        });
    }
    renderMovies(movieHistory);
}

function clearMovieInput() {
    movieInput_input.value = "";
}

function clearMovies() {
    myMovieList_ul.innerHTML = '';
}

addMovie_button.addEventListener("mouseup", handleAddMovie);

function addMovie(userTypedText) {
    const li = document.createElement("li"); 
    const textToInsert = document.createTextNode(userTypedText);
    li.appendChild(textToInsert);
    myMovieList_ul.appendChild(li);
}

function filterMovies() {
    const textInput = filter_input.value;
    const filteredMovies = movieHistory.filter(movie => movie.title.includes(textInput));
    return filteredMovies;
}

filter_input.addEventListener("input", renderMovies);

function renderMovies() {
    myMovieList_ul.innerHTML = '';
    const filteredMovies = filterMovies();
    filteredMovies.map(movie => addMovie(movie.title));
}

function removeElement() {
}

function createTable() {
}
