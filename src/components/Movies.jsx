import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";

import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";

import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";

class Movies extends Component {
  state = {
    movies: null,
    genres: null,
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { propertyPath: "title", order: "asc" },
  };

  static sort(movies, sortColumn) {
    let sortedMovies = _(movies).sortBy("title").sortBy(sortColumn.propertyPath).value();
    if (sortColumn.order === "desc") sortedMovies = _.reverse(sortedMovies);
    if (sortColumn.propertyPath === "liked") sortedMovies = _.reverse(sortedMovies);
    return sortedMovies;
  }

  componentDidMount() {
    const genreAny = { _id: null, name: "All Genres" };
    const genres = [genreAny, ...getGenres()];
    const movies = Movies.sort(getMovies(), this.state.sortColumn);
    this.setState({ movies, genres, selectedGenre: genreAny });
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

  handleSort = (sortColumn) => {
    const movies = Movies.sort(this.state.movies, sortColumn);
    this.setState({ movies, sortColumn, currentPage: 1 });
  };

  render() {
    const { movies, genres, selectedGenre, pageSize, currentPage, sortColumn } = this.state;

    if (!movies || !genres) return <p className="h3 text-nowrap">Loading...</p>;

    const filteredMovies = selectedGenre?._id ? movies.filter((movie) => movie.genre._id === selectedGenre._id) : movies;

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
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
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
