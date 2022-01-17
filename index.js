fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
        const bestMovieSection = document.getElementById("best-movie");
        const bestMovie = value.results[0];

        bestMovieSection.innerHTML = `
            <div>
                <h1>${bestMovie.title}</h1>
                <button>Play</button>
            </div>
            <img src=${bestMovie.image_url} alt="Movie poster"/>`;

    })
    .catch(function(err) {
    // Une erreur est su rvenue
    })


//     var img = document.createElement("img");
// img.src = "http://www.google.com/intl/en_com/images/logo_plain.png";
// var src = document.getElementById("header");
// src.appendChild(img);