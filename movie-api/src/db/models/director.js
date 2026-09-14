import mongoose from "mongoose";

const directorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        "Yönetmen adı zorunludur.",
      ],
    },
    birthYear: {
      type: Number,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Director =
  mongoose.models.Director ||
  mongoose.model("Director", directorSchema);
