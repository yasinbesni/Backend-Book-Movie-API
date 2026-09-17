import express from "express";

const app = express();

app.use((req, res, next) => {
  console.log("Yeni bir Request geldi.");

  next();
});

app.get("/movies", (req, res) => {
  res.send("Filmler");
});

app.listen(3000, () => {
  console.log("Server 3000 portunda çalışıyor.");
});
