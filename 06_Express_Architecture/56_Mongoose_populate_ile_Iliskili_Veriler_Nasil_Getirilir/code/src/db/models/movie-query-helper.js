movieSchema.query.forMovieList = function () {
  return this
    .select({
      title: 1,
      releaseYear: 1,
      voteAverage: 1,
      director: 1,
    })
    .sort({
      voteAverage: -1,
      releaseYear: -1,
      _id: 1,
    });
};
