import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Merhaba Express!");
});

app.get("/movies", (req, res) => {
  res.send("Filmler");
});

app.get("/movies/42", (req, res) => {
  res.send("Film bilgileri");
});

app.put("/movies/42", (req, res) => {
  res.send("Film tamamen güncellendi.");
});

app.patch("/movies/42", (req, res) => {
  res.send("Filmin belirli alanları güncellendi.");
});

app.delete("/movies/42", (req, res) => {
  res.send("Film silindi.");
});

app.listen(3000, () => {
  console.log("Server 3000 portunda çalışıyor.");
});