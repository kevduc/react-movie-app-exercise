import React, { Component } from "react";

import Like from "./common/Like";
import StarRating from "./common/StarRating";
import DeleteButton from "./common/DeleteButton";

import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/Pagination";

class Movies extends Component {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };

  handlePageChange = (page) => {
    if (page === this.state.currentPage) return;
    this.setState({ ...this.state, currentPage: page });
  };

  handleLike = (movieId) => {
    // Copy state.movies
    const movies = [...this.state.movies];
    // Find the clicked movie index
    const movieIndex = this.state.movies.findIndex((movie) => movie._id === movieId);
    // Copy the movie
    let movie = { ...movies[movieIndex] };
    // Update properties
    movie.liked = !movie.liked;
    movie.dailyRentalRate = movie.dailyRentalRate + (movie.liked ? 0.5 : -0.5);
    // Update movie
    movies[movieIndex] = { ...movie };
    // Set state
    this.setState({ ...this.state, movies });
  };

  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((movie) => movie._id !== movieId);
    this.setState({ ...this.state, movies });
  };

  render() {
    const numberOfMovies = this.state.movies.length;
    return (
      <div>
        <p className="h3">
          {numberOfMovies > 0 ? `Showing ${numberOfMovies} movies in the database.` : `There are no movies in the database.`}
        </p>
        {numberOfMovies > 0 ? (
          <React.Fragment>
            <table className="table table-hover mt-5 align-middle text-center">
              <thead>
                <tr>
                  <th scope="col" className="text-left">
                    Title
                  </th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rating</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {[...Array(this.state.pageSize).keys()]
                  .map((i) => i + this.state.pageSize * (this.state.currentPage - 1))
                  .filter((i) => i < numberOfMovies)
                  .map((i) => this.state.movies[i])
                  .map((movie) => (
                    <tr key={movie._id}>
                      <td className="text-left">{movie.title}</td>
                      <td>{movie.genre.name}</td>
                      <td>{movie.numberInStock}</td>
                      <td>
                        {
                          <StarRating
                            className="star darkgold"
                            //hideEmpty={true}
                            rating={movie.dailyRentalRate}
                            maxRating={5}
                            //className="star"
                          />
                        }
                      </td>
                      <td>
                        <Like
                          className=""
                          liked={movie.liked}
                          //color="black"
                          //colorLiked="red"
                          onClick={() => {
                            this.handleLike(movie._id);
                          }}
                        />
                      </td>
                      <td>
                        <DeleteButton
                          className="deleteButton btn-sm"
                          onClick={() => {
                            this.handleDelete(movie._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              onPageChange={this.handlePageChange}
              itemsCount={numberOfMovies}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
            />
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Movies;
