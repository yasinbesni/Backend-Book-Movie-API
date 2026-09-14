const parseFilterNumber = (value) => {
  if (
    typeof value !== "string" ||
    value.trim() === ""
  ) {
    return null;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return null;
  }

  return number;
};

export const buildMovieFilter = (query) => {
  const filter = {};

  if (query.year !== undefined) {
    const year = parseFilterNumber(query.year);

    if (
      !Number.isSafeInteger(year) ||
      year < 1888
    ) {
      return {
        filter: null,
        error:
          "year 1888 veya daha büyük tam sayı olmalıdır.",
      };
    }

    filter.releaseYear = year;
  }

  if (query.minVoteAverage !== undefined) {
    const minVoteAverage = parseFilterNumber(
      query.minVoteAverage,
    );

    if (
      minVoteAverage === null ||
      minVoteAverage < 0 ||
      minVoteAverage > 10
    ) {
      return {
        filter: null,
        error:
          "minVoteAverage 0 ile 10 arasında sayı olmalıdır.",
      };
    }

    filter.voteAverage = {
      $gte: minVoteAverage,
    };
  }

  return {
    filter,
    error: null,
  };
};
