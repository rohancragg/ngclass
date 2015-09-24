
(function(){
    "use strict";

    function MovieListController($log, alerting, movies, movieData, deletionConfirmer) {
        var model = this;

        model.movies = movies;
        model.searchTerm = "";
        model.orderByTerm = "-rating";

        function refreshMovies() {
            movieData.getAllMovies()
                     .then(function(movies){
                         $log.info(movies);
                         model.movies = movies;
                     });
        }

        model.confirmDelete = function(movie) {

            deletionConfirmer.deleteMovie(movie)
                    .then(function(movie){
                            // success handler gets called when
                            // $scope.close is called from modal controller/
                            // and parameter to scope.close appears here
                            movieData.deleteMovie(movie).then(function() {
                                alerting.addInfo(movie.title + " deleted!");
                                refreshMovies();
                        });
                    });

        };

        model.rateMovie = function(movie) {
            var result = {
                "good-movie": movie.rating >= 5,
                "bad-movie": movie.rating < 2
            };
            return result;
        };

        model.increaseRating = function(movie) {
            if(movie.rating < 5) {
                movie.rating += 1;
            }
            else {
                movie.rating = 1;
            }
        };

        model.decreaseRating = function(movie) {
            if(movie.rating > 1) {
                movie.rating -= 1;
            }
            else {
                movie.rating = 5;
            }
        };

    }

    angular.module("movies-app")
           .controller("MovieListController",
                ["$log", "alerting", "movies", "movieData", "deletionConfirmer", MovieListController]);

}());
