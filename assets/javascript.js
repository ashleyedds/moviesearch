$(document).ready(() => {

    $("#search-button").on("click", (event) => {
        event.preventDefault();
        const movieSearch = $("#movie-input").val().trim();

        const queryURL = `https://api.themoviedb.org/3/search/movie?query=${movieSearch}&api_key=0a9190c3d37a866d316a11a18a3eef87`;



        $.ajax({
            url: queryURL,
            method: "GET"
        }).done((response) => {
            if (response.results.length === 0) {
                $(".intro").html("Sorry, we weren't able to find anything.");
                $(".projector-img").attr("src", "./assets/images/tragedy-mask.png");
            }
            else {
                $(".movie-display").empty();
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
                <h5 class='card-title'>${movieTitle}</h5></div>`)
                    const cardFooter = (`<div class='card-footer'><button type='button' class='btn btn-primary plotBtn' data-toggle='modal' data-target='#plotModal' data-title='${movieTitle}' data-plot='${movieOverview}'>Overview</button></div>`);

                    movieCard.append(cardImg, cardBody, cardFooter);

                    $(".movie-display").append(movieCard);


                }
            }
        });
    });


})