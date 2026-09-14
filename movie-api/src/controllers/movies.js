import mongoose from "mongoose";

import { Movie } from "../db/models/movie.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});

    res.status(200).json({
      message: "Filmler getirildi.",
      data: movies,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Filmler getirilemedi.",
    });
  }
};

export const getMovieById = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Film getirilemedi.",
    });
  }
};

export const createMovie = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Film oluşturulamadı.",
    });
  }
};

export const updateMovieById = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Film güncellenemedi.",
    });
  }
};

export const deleteMovieById = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Film silinemedi.",
    });
  }
};