import "dotenv/config";

const getRequiredString = (name) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `${name} environment variable zorunludur.`,
    );
  }

  return value;
};

const parsePort = (value) => {
  if (value === undefined) {
    return 3000;
  }

  const port = Number(value);

  if (
    !Number.isSafeInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error(
      "PORT 1 ile 65535 arasında tam sayı olmalıdır.",
    );
  }

  return port;
};

export const env = {
  mongodbUrl: getRequiredString(
    "MONGODB_URL",
  ),
  port: parsePort(process.env.PORT),
  corsOrigin: getRequiredString(
    "CORS_ORIGIN",
  ),
};
