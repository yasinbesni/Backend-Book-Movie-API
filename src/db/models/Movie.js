import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [
      true,
      "Film adı zorunludur.",
    ],
  },
  releaseYear: {
    type: Number,
    min: [
      1888,
      "Film yılı 1888'den küçük olamaz.",
    ],
  },
  voteAverage: {
    type: Number,
    min: [
      0,
      "Film puanı 0'dan küçük olamaz.",
    ],
    max: [
      10,
      "Film puanı 10'dan büyük olamaz.",
    ],
  },
});

export const Movie =
  mongoose.model("Movie", movieSchema);