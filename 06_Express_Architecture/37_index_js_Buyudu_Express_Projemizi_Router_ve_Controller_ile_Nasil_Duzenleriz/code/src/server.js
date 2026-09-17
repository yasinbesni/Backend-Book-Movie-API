import express from "express";

import moviesRouter from "./routers/movies.js";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Merhaba Express!");
});

app.use("/movies", moviesRouter);
