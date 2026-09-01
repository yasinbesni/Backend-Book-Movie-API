import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
    min: 1888,
  },
  voteAverage: {
    type: Number,
    min: 0,
    max: 10,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
