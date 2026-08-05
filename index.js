import express from "express"


const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/movies", (req, res) => {
  res.send("Filmler görüntüleniyor.");
});

app.get("/about", (req, res) => {
  res.send("Hakkında sayfası.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});