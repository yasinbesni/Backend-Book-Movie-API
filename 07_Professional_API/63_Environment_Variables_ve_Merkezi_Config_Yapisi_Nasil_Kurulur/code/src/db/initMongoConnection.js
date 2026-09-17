import mongoose from "mongoose";

import { env } from "../config/env.js";

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(env.mongodbUrl);

    console.log("MongoDB bağlantısı başarılı.");
  } catch (error) {
    console.error(
      "MongoDB bağlantısı kurulamadı:",
      error.message,
    );

    throw error;
  }
};
