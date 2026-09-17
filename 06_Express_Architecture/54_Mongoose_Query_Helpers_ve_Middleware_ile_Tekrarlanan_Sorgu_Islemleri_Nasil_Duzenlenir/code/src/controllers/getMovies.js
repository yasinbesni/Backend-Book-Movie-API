const moviesQuery = Movie.find(filter)
  .select({
    title: 1,
    releaseYear: 1,
    voteAverage: 1,
  })
  .sort({
    voteAverage: -1,
    releaseYear: -1,
    _id: 1,
  })
  .skip(skip)
  .limit(limit)
  .lean();
