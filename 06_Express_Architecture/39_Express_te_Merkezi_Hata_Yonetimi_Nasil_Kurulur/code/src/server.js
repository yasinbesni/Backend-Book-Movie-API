import express from "express";

import { errorHandler }
  from "./middlewares/errorHandler.js";
import { requestLogger }
  from "./middlewares/requestLogger.js";
import moviesRouter from "./routers/movies.js";

export const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Merhaba Express!");
});

app.use("/movies", moviesRouter);

app.use(errorHandler);
