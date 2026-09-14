import express from "express";

const app = express();

app.get("/movies", (req, res) => {
  res.send("Filmler görüntüleniyor.");
});

app.post("/movies", (req, res) => {
  res.send("Yeni film oluşturuluyor.");
});

app.put("/movies/42", (req, res) => {
  res.send("Film tamamen güncelleniyor.");
});

app.patch("/movies/42", (req, res) => {
  res.send("Filmin belirli alanları güncelleniyor.");
});

app.delete("/movies/42", (req, res) => {
  res.send("Film siliniyor.");
});

app.listen(3000, () => {
  console.log("Server 3000 portunda çalışıyor.");
});