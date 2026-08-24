import "dotenv/config";
import express from "express";
import { initMongoConnection } from "./db/InitMongoConnection/InitMongoConnection.js";

const app = express();

app.use(express.json());

// Önceki bölümlerde oluşturduğumuz
// middleware ve Route'lar burada kalır.

app.get("/movies", (req, res) => {
  res.send("Filmler");
});

const startServer = async () => {
  try {
    await initMongoConnection();

    app.listen(3000, () => {
      console.log("Server 3000 portunda çalışıyor.");
    });
  } catch (error) {
    console.error("Uygulama başlatılamadı.");
  }
};

startServer();