import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";

import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";

import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";

class Movies extends Component {
  state = { movies: null, genres: null, selectedGenre: null, pageSize: 4, currentPage: 1, sortBy: null, sortOrder: null };

  componentDidMount() {
    const genreAny = { _id: null, name: "All Genres" };
    const genres = [genreAny, ...getGenres()];
    this.setState({ movies: getMovies(), genres, selectedGenre: genreAny });
  }

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
    this.setState({ movies });
  };

  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((movie) => movie._id !== movieId);
    const pageCount = Math.ceil(movies.length / this.state.pageSize);
    const currentPage = _.clamp(this.state.currentPage, 1, pageCount);
    this.setState({ movies, currentPage });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortBy) => {
    const sortOrder = sortBy === this.state.sortBy ? { asc: "desc", desc: "asc" }[this.state.sortOrder] : "asc";

    let sortedMovies = _(this.state.movies).sortBy("_id").sortBy(sortBy).value();
    if (sortOrder === "desc") sortedMovies = _.reverse(sortedMovies);

    this.setState({ movies: sortedMovies, sortBy, sortOrder });
  };

  render() {
    const { movies: allMovies, genres, selectedGenre, pageSize, currentPage, sortBy, sortOrder } = this.state;

    if (allMovies === null || genres === null) return <p className="h3 text-nowrap">Loading...</p>;

    const filteredMovies = selectedGenre?._id ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id) : allMovies;

    const processedMovies = filteredMovies;

    const numberOfMovies = processedMovies.length;

    let moviesOnPage = paginate(processedMovies, currentPage, pageSize);

    // if (numberOfMovies === 0) return <p className="h3">There are no movies in the database.</p>;

    return (
      <div className="container mw-max-content">
        <div className="row mw-max-content">
          <div className="col d-flex flex-column align-items-right mr-3 mb-4 text-center mw-max-content">
            <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreChange} />
          </div>
          <div className="col d-flex flex-column align-items-stretch">
            <p className="h3 mb-4">Showing {numberOfMovies} movies in the database.</p>
            <MoviesTable
              movies={moviesOnPage}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
            <Pagination
              onPageChange={this.handlePageChange}
              itemsCount={numberOfMovies}
              pageSize={pageSize}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
