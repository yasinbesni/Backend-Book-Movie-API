import express from "express"


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/movies", (req, res) => {
  console.log(req.body);

  res.json({
    data: req.body,
  });
});

app.get("/about", (req, res) => {
  res.send("Hakkında sayfası.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});