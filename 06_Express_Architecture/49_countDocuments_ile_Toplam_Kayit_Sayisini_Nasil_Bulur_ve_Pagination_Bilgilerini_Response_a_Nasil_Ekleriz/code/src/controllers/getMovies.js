import {
  parsePaginationParams,
} from "../utils/parsePaginationParams.js";

import {
  calculatePaginationData,
} from "../utils/calculatePaginationData.js";

export const getMovies = async (req, res) => {
  const {
    page,
    limit,
  } = parsePaginationParams(req.query);

  const skip = (page - 1) * limit;

  const totalItems =
    await Movie.countDocuments({})
      .exec();

  const moviesQuery = Movie.find({})
    .sort({
      voteAverage: -1,
      releaseYear: -1,
      _id: 1,
    })
    .skip(skip)
    .limit(limit);

  const movies = await moviesQuery.exec();

  const {
    totalPages,
    hasNext,
    hasPrevious,
  } = calculatePaginationData(totalItems, limit, page);

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
