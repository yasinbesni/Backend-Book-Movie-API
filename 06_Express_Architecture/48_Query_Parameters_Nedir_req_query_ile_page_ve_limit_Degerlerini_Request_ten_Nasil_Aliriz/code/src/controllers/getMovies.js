import {
  parsePaginationParams,
} from "../utils/parsePaginationParams.js";

export const getMovies = async (req, res) => {
  const {
    page,
    limit,
  } = parsePaginationParams(req.query);

  const skip = (page - 1) * limit;

  const movies = await Movie.find({})
    .sort({
      voteAverage: -1,
      releaseYear: -1,
      _id: 1,
    })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    message: "Filmler getirildi.",
    page,
    limit,
    data: movies,
  });
};
