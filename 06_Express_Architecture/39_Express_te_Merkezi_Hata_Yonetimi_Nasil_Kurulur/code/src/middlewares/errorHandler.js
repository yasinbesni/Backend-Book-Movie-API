export const errorHandler = (
  error,
  req,
  res,
  next,
) => {
  console.error(error);

  res.status(500).json({
    message: "Sunucuda beklenmeyen bir hata oluştu.",
  });
};
