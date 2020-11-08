import React, { Component } from "react";
import _ from "lodash";

import Like from "./common/Like";
import StarRating from "./common/StarRating";
import DeleteButton from "./common/DeleteButton";

import { getMovies } from "../services/fakeMovieService";

import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";

import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/ListGroup";

class Movies extends Component {
  state = { movies: [], genres: [], selectedGenre: null, pageSize: 4, currentPage: 1 };

  componentDidMount() {
    const genreAny = { _id: null, name: "All Genres" };
    const genres = [genreAny, ...getGenres()];
    this.setState({ movies: getMovies(), genres, selectedGenre: genreAny });
  }

  handleGenreChange = (genre) => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
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
    this.setState({ movies });
  };

  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((movie) => movie._id !== movieId);
    const pageCount = Math.ceil(movies.length / this.state.pageSize);
    const currentPage = _.clamp(this.state.currentPage, 1, pageCount);
    this.setState({ movies, currentPage });
  };

  render() {
    const { movies: allMovies, genres, selectedGenre, pageSize, currentPage } = this.state;

    if (genres.length === 0) return <p className="h3 text-nowrap">Loading...</p>;

    const filteredMovies = selectedGenre?._id ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id) : allMovies;

    const numberOfMovies = filteredMovies.length;

    let moviesOnPage = paginate(filteredMovies, currentPage, pageSize);

    // if (numberOfMovies === 0) return <p className="h3">There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <div className="float-left mr-5">
          <ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreChange} />
        </div>
        <div className="d-flex flex-column align-items-stretch">
          <p className="h3 text-nowrap">Showing {numberOfMovies} movies in the database.</p>
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
              {moviesOnPage.map((movie) => (
                <tr key={movie._id}>
                  <td className="text-left text-nowrap">{movie.title}</td>
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
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
