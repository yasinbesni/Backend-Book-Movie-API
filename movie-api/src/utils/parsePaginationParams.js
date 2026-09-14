const parseNumber = (value, defaultValue) => {
  if (typeof value !== "string") {
    return defaultValue;
  }

  const parsedNumber = Number(value);

  if (
    !Number.isSafeInteger(parsedNumber) ||
    parsedNumber < 1
  ) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, limit } = query;

  const parsedPage = parseNumber(page, 1);

  const parsedLimit = parseNumber(limit, 10);

  return {
    page: parsedPage,
    limit: Math.min(parsedLimit, 50),
  };
};
