$(document).ready(() => {

    $("#search-button").on("click", (event) => {
        event.preventDefault();
        const movieSearch = $("#movie-input").val().trim();

        const queryURL = `https://api.themoviedb.org/3/search/movie?query=${movieSearch}&api_key=0a9190c3d37a866d316a11a18a3eef87`;

        $(".movie-display").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done((response) => {
            if (response.results.length === 0) {
                
                const noResults = $("<h5>Sorry, we can't seem to find a movie that matches that search</h5>")

                $(".movie-display").append(noResults)

            }
            else {
            for (let i = 0; i < response.results.length; i++) {
                $(".plotBtn").on("click", function () {
                    $("#plotModal").modal("show")
                    const title = $(this).attr("data-title");
                    const plot = $(this).attr("data-plot");
                    $("#modalLabel").text(title)
                    $("#modalBody").text(plot);
                });

                const movieTitle = response.results[i].title;
                const movieOverview = response.results[i].overview;
                const moviePoster = `http://image.tmdb.org/t/p/w342//${response.results[i].poster_path}`

                const movieCard = $("<div class='card'>");
                const cardImg = $(`<img class='card-img-top' src=${moviePoster}>`);
                const cardBody = $(`<div class='card-body'>
                <h5 class='card-title'>${movieTitle}</h5>
                <button type='button' class='btn btn-primary plotBtn' data-toggle='modal' data-target='#plotModal' data-title='${movieTitle}' data-plot='${movieOverview}'>Overview</button>`);

                movieCard.append(cardImg, cardBody);
                
                $(".movie-display").append(movieCard);
                

            }
        }
        });
    });


})