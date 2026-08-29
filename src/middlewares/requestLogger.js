export const requestLogger = (
  req,
  res,
  next,
) => {
  console.log("Bir Request geldi.");

  next();
};