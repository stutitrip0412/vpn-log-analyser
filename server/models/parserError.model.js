import mongoose from "mongoose";

const parserErrorSchema = new mongoose.Schema(
  {
    lineNumber: {
      type: Number,
      required: true,
    },

    rawLine: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    uploadedFile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ParserError",
  parserErrorSchema
);