export const requestLogger = async(
  req,
  res,
  next,
) => {
  console.log("Bir Request geldi.");

  next();
};