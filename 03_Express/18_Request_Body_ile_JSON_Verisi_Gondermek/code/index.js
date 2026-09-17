import express from "express";

const app = express();

app.use(express.json());

app.post("/movies", (req, res) => {
  console.log(req.body);

  res.send("Film bilgileri alındı.");
});

app.listen(3000, () => {
  console.log("Server 3000 portunda çalışıyor.");
});
