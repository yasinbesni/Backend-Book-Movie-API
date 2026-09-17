movieSchema.methods.isHighRated = function () {
  if (typeof this.voteAverage !== "number") {
    return false;
  }

  return (
    this.voteAverage >=
    HIGH_RATING_THRESHOLD
  );
};

movieSchema.statics.countHighRated = function () {
  return this.countDocuments({
    voteAverage: {
      $gte: HIGH_RATING_THRESHOLD,
    },
  });
};
