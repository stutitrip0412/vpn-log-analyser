import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    message: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const caseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    investigator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    evidenceLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LogEntry",
      },
    ],

    notes: [noteSchema],

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "CLOSED"],
      default: "OPEN",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Case", caseSchema);