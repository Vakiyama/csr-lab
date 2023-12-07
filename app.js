const movieInput_input = document.querySelector("input");
const myMovieList_ul = document.querySelector("ul");
const addMovie_button = document.querySelector("#add-movie-button");
const filter_input = document.querySelector("#filter");

/* 
    * Movie:
    * - title: string,
    * - timesWatched: number,
    * - cleared: boolean,
*/

const previouslyStored = JSON.parse(localStorage.getItem("movieState")); 
let movieState = previouslyStored ? previouslyStored : [];
renderMovies();
renderMovieHistory();

function handleAddMovie() {
    const inputText = movieInput_input.value;
    addMovieToHistory(inputText);
    clearMovieInput();
    localStorage.setItem("movieState", JSON.stringify(movieState));
}

function incrementMovieHistory(movieIndex) {
    movieState[movieIndex].timesWatched += 1;
    renderMovies(movieState);
    return;
}

function addMovieToHistory(inputText) {
    const movieIndex = movieState.findIndex(movie => movie.title === inputText);
    if (movieIndex !== -1) {
        incrementMovieHistory(movieIndex);
    } else {
        movieState.push({
            title: inputText,
            timesWatched: 1,
            cleared: false,
        });
        renderMovies();
    }
    renderMovieHistory();
}

function clearMovieInput() {
    movieInput_input.value = "";
}

function clearMovies() {
    myMovieList_ul.innerHTML = '';
    movieState = movieState.map(movie => {
        movie.cleared = true;
        return movie;
    });
    localStorage.setItem("movieState", JSON.stringify(movieState));
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
    const filteredMovies = movieState.filter(movie => { 
        return movie.title.includes(textInput) && !movie.cleared;
    });
    return filteredMovies;
}

filter_input.addEventListener("input", renderMovies);

function renderMovies() {
    myMovieList_ul.innerHTML = '';
    const filteredMovies = filterMovies(movie => movie.cleared === true);
    filteredMovies.map(movie => addMovie(movie.title));
}

function renderMovieHistory() {
    const tableRows = movieState.map(movie => {
       return `
            <tr>
                <td>${movie.title}</td>
                <td>${movie.timesWatched}</td>
            </tr>
        ` 
    }).join("");
    
    movieHistoryCard.innerHTML = createTable(tableRows);
}

function createTable(tableRows) {
    return `
        <h5 class="card-title">Movie History</h5>
        <table>
           <tbody class="movie-history"> 
                <tr>
                    <th>Movie</th>
                    <th>Times Watched</th>
                </tr>
                ${tableRows}
            </tbody>
        </table>`
}
