import React, { Component } from 'react'

import Like from './common/Like'
import StarRating from './common/StarRating'
import DeleteButton from './common/DeleteButton'
import Table from './common/Table'

class MoviesTable extends Component {
  columns = [
    { propertyPath: 'title', label: 'Title' },
    { propertyPath: 'genre.name', label: 'Genre' },
    { propertyPath: 'numberInStock', label: 'Stock' },
    {
      propertyPath: 'dailyRentalRate',
      label: 'Rating',
      render: (movie) => (
        <StarRating
          className="star darkgold"
          //hideEmptyStars={true}
          rating={movie.dailyRentalRate}
          maxRating={5}
        />
      ),
    },
    {
      propertyPath: 'liked',
      label: 'Liked',
      render: (movie) => (
        <Like
          liked={movie.liked}
          //colorUnliked="black"
          //colorLiked="red"
          onClick={() => {
            this.props.onLike(movie._id)
          }}
        />
      ),
    },
    {
      key: 'delete',
      render: (movie) => (
        <DeleteButton
          className="deleteButton btn-sm"
          onClick={() => {
            this.props.onDelete(movie._id)
          }}
        />
      ),
    },
  ]

  render() {
    const { movies, sortColumn, onSort } = this.props

    return (
      <Table
        className="table-hover align-middle text-center"
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    )
  }
}

MoviesTable.defaultProps = {}

export default MoviesTable
