import mongoose from "mongoose";

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB bağlantısı başarılı.");
  } catch (error) {
    console.error(
      "MongoDB bağlantısı kurulamadı:",
      error.message
    );

    throw error;
  }
};
