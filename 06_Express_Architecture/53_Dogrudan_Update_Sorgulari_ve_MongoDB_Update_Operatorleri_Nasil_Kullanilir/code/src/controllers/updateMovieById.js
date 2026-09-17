export const updateMovieById = async (req, res) => {
  const { movieId } = req.params;

  if (!mongoose.isObjectIdOrHexString(movieId)) {
    return res.status(400).json({
      message: "Geçersiz film kimliği.",
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

  const fieldsToSet = {};

  if (title !== undefined) {
    fieldsToSet.title = title;
  }

  if (releaseYear !== undefined) {
    fieldsToSet.releaseYear = releaseYear;
  }

  if (voteAverage !== undefined) {
    fieldsToSet.voteAverage = voteAverage;
  }

  const updateMovieQuery = Movie.findByIdAndUpdate(
    movieId,
    {
      $set: fieldsToSet,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  const updatedMovie = await updateMovieQuery.exec();

  if (updatedMovie === null) {
    return res.status(404).json({
      message: "Film bulunamadı.",
    });
  }

  res.status(200).json({
    message: "Film güncellendi.",
    data: updatedMovie,
  });
};
