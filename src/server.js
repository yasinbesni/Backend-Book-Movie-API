import express from "express";

import { requestLogger }
  from "./middlewares/requestLogger.js";
import moviesRouter from "./routers/movies.js";

export const app = express();

app.use(express.json());

app.use(requestLogger);

app.use("/", moviesRouter);