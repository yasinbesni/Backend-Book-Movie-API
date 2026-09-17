const moviesQuery = Movie.find(filter)
  .forMovieList()
  .populate({
    path: "director",
    select: {
      name: 1,
      _id: 0,
    },
  })
  .skip(skip)
  .limit(limit)
  .lean();
