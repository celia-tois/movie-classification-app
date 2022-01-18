const bestMovieSection = document.getElementById("best-movie");
const topRatedMoviesSection = document.getElementById("top-rated-movies");
const thrillerSection = document.getElementById("thriller-movies");
const frenchSection = document.getElementById("french-movies");
const movies2000sSection = document.getElementById("movies-from-2000s");

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
        <button>Play</button>
    </div>
    <div id="best-movie-image" style="background-image: linear-gradient(to right, #000 0%, transparent 20%), url(${bestMovie.image_url})">
        <img src=${bestMovie.image_url} alt="Movie poster"/>
    </div>`
}

displayBestMovie();


const displayTopRatedMovies = async() => {
    await fetchData("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
    const bestMovies = [];
    data.results.map(movie => (
        bestMovies.push(movie)
    ))
    while (bestMovies.length < 8) {
        await fetchData(data.next)
        data.results.map(movie => {
            if (bestMovies.length < 8) {
                bestMovies.push(movie)
            }
            
        })
    }
    bestMovies.shift();
    
    topRatedMoviesSection.innerHTML = `
        <h2>Top rated movies</h2>
        <div class="movies">
        ${bestMovies
            .map(movie => (`<img src=${movie.image_url} alt="Movie poster"/>`))
            .join("")}
        </div>
        `
}

displayTopRatedMovies();


const displayThrillerMovies = async() => {
    await fetchData("http://localhost:8000/api/v1/titles/?genre=thriller");
    const moviesToDisplay = []
    data.results.map(movie => (
        moviesToDisplay.push(movie)
    ))
    while (moviesToDisplay.length < 7) {
        await fetchData(data.next)
        data.results.map(movie => {
            if (moviesToDisplay.length < 7) {
                moviesToDisplay.push(movie)
            }
            
        })
    }
    
    thrillerSection.innerHTML = `
        <h2>Thriller</h2>
        <div class="movies">
        ${moviesToDisplay
            .map(movie => (`<img src=${movie.image_url} alt="Movie poster"/>`))
            .join("")}
        </div>
        `
}

displayThrillerMovies();

const displayFrenchMovies = async() => {
    await fetchData("http://localhost:8000/api/v1/titles/?lang=french");
    const moviesToDisplay = []
    data.results.map(movie => (
        moviesToDisplay.push(movie)
    ))
    while (moviesToDisplay.length < 7) {
        await fetchData(data.next)
        data.results.map(movie => {
            if (moviesToDisplay.length < 7) {
                moviesToDisplay.push(movie)
            }
            
        })
    }
    
    frenchSection.innerHTML = `
        <h2>French movies</h2>
        <div class="movies">
        ${moviesToDisplay
            .map(movie => (`<img src=${movie.image_url} alt="Movie poster"/>`))
            .join("")}
        </div>
        `
}

displayFrenchMovies();

const displayMoviesFrom2000s = async() => {
    await fetchData("http://localhost:8000/api/v1/titles/?min_year=2000&max_year=2009");
    const moviesToDisplay = []
    data.results.map(movie => (
        moviesToDisplay.push(movie)
    ))
    while (moviesToDisplay.length < 7) {
        await fetchData(data.next)
        data.results.map(movie => {
            if (moviesToDisplay.length < 7) {
                moviesToDisplay.push(movie)
            }
            
        })
    }
    
    movies2000sSection.innerHTML = `
        <h2>Movies from the 2000s</h2>
        <div class="movies">
        ${moviesToDisplay
            .map(movie => (`<img src=${movie.image_url} alt="Movie poster"/>`))
            .join("")}
        </div>
        `
}

displayMoviesFrom2000s();