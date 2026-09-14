import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("Yeni bir Request geldi.");

  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);

  next();
});

app.get("/movies", (req, res) => {
  res.send("Filmler görüntüleniyor.");
});

app.post("/movies", (req, res) => {
  const movie = req.body;

  res.json({
    message: "Film bilgileri alındı.", 
    data: movie,
  });
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