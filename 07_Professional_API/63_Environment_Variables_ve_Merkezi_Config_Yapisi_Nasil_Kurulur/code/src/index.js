import { env } from "./config/env.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { app } from "./server.js";

const startServer = async () => {
  try {
    await initMongoConnection();

    app.listen(env.port, () => {
      console.log(
        `Server ${env.port} portunda çalışıyor.`,
      );
    });
  } catch (error) {
    console.error("Uygulama başlatılamadı.");
  }
};

startServer();
