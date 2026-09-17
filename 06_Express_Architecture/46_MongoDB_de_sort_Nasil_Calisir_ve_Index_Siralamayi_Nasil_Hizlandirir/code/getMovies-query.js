Movie.find({}).sort({
  voteAverage: -1,
  releaseYear: -1,
  _id: 1,
});
