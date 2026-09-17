import cors from "cors";
import express from "express";
import helmet from "helmet";

import { env } from "./config/env.js";
import { errorHandler }
  from "./middlewares/errorHandler.js";
import { apiRateLimiter }
  from "./middlewares/rateLimiter.js";
import { requestLogger }
  from "./middlewares/requestLogger.js";
import moviesRouter from "./routers/movies.js";

export const app = express();

app.use(requestLogger);
app.use(helmet());

app.use(
  cors({
    origin: env.corsOrigin,
  }),
);

app.use(apiRateLimiter);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Merhaba Express!");
});

app.use("/movies", moviesRouter);

app.use(errorHandler);
