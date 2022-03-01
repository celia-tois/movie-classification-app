const modalDiv = document.createElement("div");
const modalSection = document.getElementById("modal");


const fetchData = async(url) => {
    data = await fetch(url)
        .then(res => res.json())
        .then(res => res)
}


const displayBestMovie = async() => {
    await fetchData("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
    const bestMovie = data.results[0];
    document.getElementById("best-movie").innerHTML = `
    <div id="best-movie-text">
        <h1>${bestMovie.title}</h1>
        <button id="play-btn">Play</button>
    </div>
    <div id="best-movie-image" style="background-image: linear-gradient(to right, #000 0%, transparent 20%), url(${bestMovie.image_url})">
        <img src=${bestMovie.image_url} alt="Movie poster"/>
    </div>`
}

displayBestMovie();


const displayMoviesSection = async(id, section, title) => {
    await fetchData("http://localhost:8000/api/v1/titles/?" + id)
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
        <div id="movies-container">
            <button id="go-left" class="carousel-btn">
                <img src="assets/arrow.svg" alt="Left arrow" class="arrow"/>
            </button>
            <div class="movies">
                ${moviesToDisplay
                    .map(movie => (`<img src=${movie.image_url} alt="Movie poster" class="movie-img"/>`))
                    .join("")}
            </div>
            <button id="go-right" class="carousel-btn">
                <img src="assets/arrow.svg" alt="Right arrow" id="right-arrow" class="arrow"/>
            </button>
        </div>
        `
    displayModal(moviesToDisplay)
    scrollLeft()
    scrollRight()
}


const scrollLeft = () => {
    document
        .querySelector("#go-left")
        .addEventListener("click", (e) => {
            let movieWidth = document.querySelector(".movie-img").getBoundingClientRect().width;
            let scrollDistance = movieWidth * 2;
            document
                .querySelector(".movies")
                .scrollBy({
                    top: 0,
                    left: -scrollDistance,
                    behavior: "smooth"
                })
        })
}

const scrollRight = () => {
    document
        .querySelector("#go-right")
        .addEventListener("click", (e) => {
            let movieWidth = document.querySelector(".movie-img").getBoundingClientRect().width;
            let scrollDistance = movieWidth * 2;
            document
                .querySelector(".movies")
                .scrollBy({
                    top: 0,
                    left: +scrollDistance,
                    behavior: "smooth"
                })
        })
}

const displayModal = (moviesToDisplay) => {
    const movies = document.querySelectorAll(".movie-img")
    movies.forEach(function (movie) {
        movie.addEventListener("click", (e) => {
            const movieSelected = moviesToDisplay.filter(movieToDisplay => movieToDisplay.image_url === e.explicitOriginalTarget.src)
            modalSection.appendChild(modalDiv)
            modalDiv.classList.add("open-modal")
            const displayModalData = async() => {
                console.log(e)
                await fetchData(movieSelected[0].url)
                modalDiv.innerHTML = `
                    <img src="assets/close.svg" alt="Close button" id="close-button"/>
                    <div id="header">
                        <img src=${data.image_url} alt="Movie poster" id="modal-img"/>
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
            displayModalData()
            setTimeout(() => {
                closeModal()
            }, 1000)
            
        })
    })
}

const closeModal = () => {
    document
        .getElementById("close-button")
        .addEventListener("click", (e) => {
            modalSection.removeChild(modalDiv)
        })
}


displayMoviesSection("sort_by=-imdb_score", document.getElementById("top-rated-movies"), "Top rated movies");
displayMoviesSection("genre=thriller", document.getElementById("thriller-movies"), "Thriller");
displayMoviesSection("lang=french", document.getElementById("french-movies"), "French movies");
displayMoviesSection("min_year=2000&max_year=2009", document.getElementById("movies-from-2000s"), "Movies from the 2000s");