import express from "express";

import {
  createMovie,
  deleteMovieById,
  getMovieById,
  getMovies,
  updateMovieById,
} from "../controllers/movies.js";

const router = express.Router();

router.get("/", getMovies);

router.get("/:movieId", getMovieById);

router.post("/", createMovie);

router.patch("/:movieId", updateMovieById);

router.delete("/:movieId", deleteMovieById);

export default router;