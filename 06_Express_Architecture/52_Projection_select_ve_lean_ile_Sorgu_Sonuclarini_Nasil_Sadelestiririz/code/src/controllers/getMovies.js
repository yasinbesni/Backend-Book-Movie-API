import {
  parsePaginationParams,
} from "../utils/parsePaginationParams.js";

import {
  calculatePaginationData,
} from "../utils/calculatePaginationData.js";

import {
  buildMovieFilter,
} from "../utils/buildMovieFilter.js";

export const getMovies = async (req, res) => {
  const {
    page,
    limit,
  } = parsePaginationParams(req.query);

  const {
    filter,
    error,
  } = buildMovieFilter(req.query);

  if (error !== null) {
    return res.status(400).json({
      message: error,
    });
  }

  const skip = (page - 1) * limit;

  const countQuery = Movie.countDocuments(filter);

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

  const totalItems = await countQuery.exec();

  const movies = await moviesQuery.exec();

  const {
    totalPages,
    hasNext,
    hasPrevious,
  } = calculatePaginationData(
    totalItems,
    limit,
    page,
  );

  res.status(200).json({
    message: "Filmler getirildi.",
    page,
    limit,
    totalItems,
    totalPages,
    hasNext,
    hasPrevious,
    data: movies,
  });
};
