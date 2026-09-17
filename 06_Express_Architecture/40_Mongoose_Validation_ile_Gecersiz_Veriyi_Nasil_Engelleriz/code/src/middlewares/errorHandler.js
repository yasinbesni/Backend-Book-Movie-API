export const errorHandler = (
  error,
  req,
  res,
  next,
) => {
  console.error(error);

  if (error.name === "ValidationError") {
    const errors = Object.values(
      error.errors,
    ).map((item) => item.message);

    return res.status(400).json({
      message: "Gönderilen film bilgileri geçersiz.",
      errors,
    });
  }

  res.status(500).json({
    message: "Sunucuda beklenmeyen bir hata oluştu.",
  });
};
