import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
  },
  voteAverage: {
    type: Number,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
