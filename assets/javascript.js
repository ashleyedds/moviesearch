$(document).ready(() => {

    //When the search button is clicked...
    $("#search-button").on("click", (event) => {
        //Prevent the form from resetting
        event.preventDefault();
        //Grab the user's inputed search term
        const movieSearch = $("#movie-input").val().trim();
        //API url in which to add the user's search terms (using keyword search functionality)
        const queryURL = `https://api.themoviedb.org/3/search/movie?query=${movieSearch}&api_key=0a9190c3d37a866d316a11a18a3eef87`;

        //AJAX GET call to query the API
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done((response) => {
            //If the response, using the keyword search, yields no results, display "no results" message to the user in the main display
            if (response.results.length === 0) {
                $(".intro").html("Sorry, we weren't able to find anything.");
                $(".projector-img").attr("src", "./assets/images/tragedy-mask.png");
            }
            //If the API does return results, empty the main display and fill it with the results, using Bootstrap 4 cards to display the data
            else {
                $(".movie-display").empty();

                //Cycle through each of the results...
                for (let i = 0; i < response.results.length; i++) {
                    //Grab the movie title, overview, and poster url to display to the user for each result
                    const movieTitle = response.results[i].title;
                    let movieOverview;
                    let moviePoster;

                    //Conditional -- if no overview, print a "sorry" message
                    if (response.results[i].overview === "") {
                        movieOverview = "Sorry, we don't have an overview for this movie :(";
                    }
                    else {
                        movieOverview = response.results[i].overview;
                    }

                    //Conditional, if no poster path provided, use a filler image
                    if (response.results[i].poster_path === null) {
                        moviePoster = "./assets/images/tragedy-mask.png"
                    }
                    else (
                        moviePoster = `http://image.tmdb.org/t/p/w342//${response.results[i].poster_path}`
                    )
                    

                    //Dynamically create Bootstrap Cards with each results' returned information
                    const movieCard = $("<div class='card'>");
                    const cardImg = $(`<img class='card-img-top' src=${moviePoster}>`);
                    const cardBody = $(`<div class='card-body'>
                            <h5 class='card-title'>${movieTitle}</h5></div>`);

                    

                    //Fix the annoying issues with inserting apostophies from strings as data attributes
                    const entityMap = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': '&quot;',
                        "'": '&#39;',
                        "/": '&#x2F;'
                    };

                    function apostropheFriendly(string) {
                        return String(string).replace(/[&<>"'\/]/g, function (s) {
                            return entityMap[s];
                        });
                    }

                    const safeTitle = apostropheFriendly(movieTitle);
                    const safeOverview = apostropheFriendly(movieOverview)

                    //Maps the title and overview as data attributes...
                    const cardFooter = (`<div class='card-footer'><button type='button' class='btn btn-primary plotBtn' data-toggle='modal' data-target='#plotModal' data-title='${safeTitle}' data-plot='${safeOverview}'>Overview</button></div>`);

                    //So they can be easily grabbed when the user clicks a button for a specific movie
                    $(".plotBtn").on("click", function () {
                        //Triggers the Bootstrap modal on click
                        $("#plotModal").modal("show");
                        //Grabs the data attributes for that specific movie to display
                        const title = $(this).attr("data-title");
                        const plot = $(this).attr("data-plot");
                        $("#modalLabel").text(title);
                        $("#modalBody").text(plot);
                    });

                    //Append the data-filled cards to the movie card div...
                    movieCard.append(cardImg, cardBody, cardFooter);

                    //Which is then dynamically appended directly into the html
                    $(".movie-display").append(movieCard);


                }
            }
        });
    });


})