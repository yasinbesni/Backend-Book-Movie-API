import mongoose from "mongoose";

import { Movie } from "../db/models/movie.js";

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

export const getMovieById = async (req, res) => {
  const { movieId } = req.params;

  if (!mongoose.isObjectIdOrHexString(movieId)) {
    return res.status(400).json({
      message: "Geçersiz film kimliği.",
    });
  }

  const movie = await Movie.findById(movieId);

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
  const {
    title,
    releaseYear,
    voteAverage,
  } = req.body;

  const movie = new Movie({
    title,
    releaseYear,
    voteAverage,
  });

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

  const movie = await Movie.findById(movieId);

  if (movie === null) {
    return res.status(404).json({
      message: "Film bulunamadı.",
    });
  }

  const {
    title,
    releaseYear,
    voteAverage,
  } = req.body;

  const hasUpdate =
    title !== undefined ||
    releaseYear !== undefined ||
    voteAverage !== undefined;

  if (!hasUpdate) {
    return res.status(400).json({
      message: "Güncellenecek film bilgisi gönderilmedi.",
    });
  }

  if (title !== undefined) {
    movie.title = title;
  }

  if (releaseYear !== undefined) {
    movie.releaseYear = releaseYear;
  }

  if (voteAverage !== undefined) {
    movie.voteAverage = voteAverage;
  }

  await movie.save();

  res.status(200).json({
    message: "Film güncellendi.",
    data: movie,
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
