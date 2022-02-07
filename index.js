const bestMovieSection = document.getElementById("best-movie");
const topRatedMoviesSection = document.getElementById("top-rated-movies");
const thrillerSection = document.getElementById("thriller-movies");
const frenchSection = document.getElementById("french-movies");
const movies2000sSection = document.getElementById("movies-from-2000s");
const modal = document.getElementById("modal");

const fetchData = async(url) => {
    data = await fetch(url)
        .then(res => res.json())
        .then(res => res)
}


const displayBestMovie = async() => {
    await fetchData("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
    const bestMovie = data.results[0];
    bestMovieSection.innerHTML = `
    <div id="best-movie-text">
        <h1>${bestMovie.title}</h1>
        <button class="open-modal">Play</button>
    </div>
    <div id="best-movie-image" style="background-image: linear-gradient(to right, #000 0%, transparent 20%), url(${bestMovie.image_url})">
        <img src=${bestMovie.image_url} alt="Movie poster"/>
    </div>`
}

displayBestMovie();


const displayMovies = async(url, section, title) => {
    await fetchData(url)
    const moviesToDisplay = [];
    data.results.map(movie => (
        moviesToDisplay.push(movie)
    ))
    while (moviesToDisplay.length < 8) {
        await fetchData(data.next)
        data.results.map(movie => {
            if (moviesToDisplay.length < 8) {
                moviesToDisplay.push(movie)
            }
            
        })
    }
    moviesToDisplay.shift();
    
    section.innerHTML = `
        <h2>${title}</h2>
        <div class="movies">
        ${moviesToDisplay
            .map(movie => (`<img src=${movie.image_url} alt="Movie poster" class="open-modal"/>`))
            .join("")}
        </div>
        `
    
    const movies = document.querySelectorAll("img")
    movies.forEach(function (movie) {
        movie.addEventListener("click", (e) => {
            const movieSelected = moviesToDisplay.filter(movieToDisplay => movieToDisplay.image_url === e.explicitOriginalTarget.src)
            console.log(movieSelected)
            modal.classList.add("open-modal")
            const displayModal = async() => {
                await fetchData(movieSelected[0].url)
                    if(modal.classList.contains("open-modal")) {
                        modal.innerHTML = `
                            <img src="assets/close.svg" alt="Close button" id="close-button"/>
                            <div id="header">
                                <img src=${data.image_url} alt="Movie poster"/>
                                <div id="movie-main-infos">
                                    <h1>${data.title}</h1>
                                    <p>${data.genres}</p>
                                    <p>${data.date_published}</p>
                                    <p>Duration: ${data.duration}</p>
                                    <p>Country of origin: ${data.countries}</p>
                                    <p>Rated: ${data.rated}</p>
                                    <p>Imdb score: ${data.imdb_score}</p>
                                </div>
                            </div>
                            <p>Directors: ${data.directors}</p>
                            <p>Actors: ${data.actors}</p>
                            <p>Box office result: ${data.worldwide_gross_income}</p>
                            <p>Description: ${data.description}</p>
                        `
                    }
            }
            displayModal()
        })
    })
}

displayMovies("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", topRatedMoviesSection, "Top rated movies");
displayMovies("http://localhost:8000/api/v1/titles/?genre=thriller", thrillerSection, "Thriller");
displayMovies("http://localhost:8000/api/v1/titles/?lang=french", frenchSection, "French movies");
displayMovies("http://localhost:8000/api/v1/titles/?min_year=2000&max_year=2009", movies2000sSection, "Movies from the 2000s");