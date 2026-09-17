import cors from "cors";
import express from "express";

import { env } from "./config/env.js";
import { errorHandler }
  from "./middlewares/errorHandler.js";
import { requestLogger }
  from "./middlewares/requestLogger.js";
import moviesRouter from "./routers/movies.js";

export const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
  }),
);

app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Merhaba Express!");
});

app.use("/movies", moviesRouter);

app.use(errorHandler);
