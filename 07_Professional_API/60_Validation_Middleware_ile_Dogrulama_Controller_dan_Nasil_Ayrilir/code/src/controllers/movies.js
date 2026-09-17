import mongoose from "mongoose";

import { Movie } from "../db/models/movie.js";


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

export const getMovieById = async (
  req,
  res,
) => {
  const { movieId } = req.params;

  if (!mongoose.isObjectIdOrHexString(movieId)) {
    return res.status(400).json({
      message: "Geçersiz film kimliği.",
    });
  }

  const movieQuery = Movie.findById(movieId)
    .populate({
      path: "director",
      select: {
        name: 1,
        birthYear: 1,
        country: 1,
        _id: 0,
      },
    });

  const movie = await movieQuery.exec();

  if (movie === null) {
    return res.status(404).json({
      message: "Film bulunamadı.",
    });
  }

  res.status(200).json({
    message: "Film getirildi.",
    data: movie,
  });
};

export const createMovie = async (req, res) => {
  const movie = new Movie(req.body);

  await movie.save();

  res.status(201).json({
    message: "Film oluşturuldu.",
    data: movie,
  });
};

export const updateMovieById = async (req, res) => {
  const { movieId } = req.params;

  if (!mongoose.isObjectIdOrHexString(movieId)) {
    return res.status(400).json({
      message: "Geçersiz film kimliği.",
    });
  }

  const updateMovieQuery = Movie.findByIdAndUpdate(
    movieId,
    {
      $set: req.body,
    },
    {
      returnDocument: "after",
    },
  );

  const updatedMovie = await updateMovieQuery.exec();

  if (updatedMovie === null) {
    return res.status(404).json({
      message: "Film bulunamadı.",
    });
  }

  res.status(200).json({
    message: "Film güncellendi.",
    data: updatedMovie,
  });
};

export const deleteMovieById = async (req, res) => {
  const { movieId } = req.params;

  if (!mongoose.isObjectIdOrHexString(movieId)) {
    return res.status(400).json({
      message: "Geçersiz film kimliği.",
    });
  }

  const deletedMovie =
    await Movie.findByIdAndDelete(movieId);

  if (deletedMovie === null) {
    return res.status(404).json({
      message: "Film bulunamadı.",
    });
  }

  res.status(200).json({
    message: "Film silindi.",
    data: deletedMovie,
  });
};
