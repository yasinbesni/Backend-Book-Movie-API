import mongoose from "mongoose";

import "./director.js";

const movieSchema = new mongoose.Schema(
  {
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
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Director",
    },
  },
  {
    timestamps: true,
  },
);

movieSchema.index(
  {
    title: 1,
    releaseYear: 1,
  },
  {
    unique: true,
  },
);

movieSchema.methods.isHighRated = function (
  minVoteAverage = 8,
) {
  if (typeof this.voteAverage !== "number") {
    return false;
  }

  return this.voteAverage >= minVoteAverage;
};

movieSchema.statics.countHighRated = function (
  minVoteAverage = 8,
) {
  return this.countDocuments({
    voteAverage: {
      $gte: minVoteAverage,
    },
  });
};

movieSchema.query.forMovieList = function () {
  return this
    .select({
      title: 1,
      releaseYear: 1,
      voteAverage: 1,
      director: 1,
    })
    .sort({
      voteAverage: -1,
      releaseYear: -1,
      _id: 1,
    });
};

movieSchema.pre(
  "findOneAndUpdate",
  function () {
    this.setOptions({
      runValidators: true,
    });
  },
);

export const Movie =
  mongoose.models.Movie ||
  mongoose.model("Movie", movieSchema);
