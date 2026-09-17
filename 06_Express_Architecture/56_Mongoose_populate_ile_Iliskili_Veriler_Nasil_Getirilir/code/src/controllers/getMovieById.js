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
