import mongoose from "mongoose";

const chainSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Case",
      required: true,
      index: true,
    },

    logEntryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LogEntry",
      required: true,
    },

    action: {
      type: String,
      enum: [
        "UPLOAD",
        "VIEW",
        "CREATE_CASE",
        "UPDATE_CASE",
        "ADD_NOTE",
        "EXPORT",
        "VERIFY_HASH",
        "DELETE",
      ],
      required: true,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    previousHash: {
      type: String,
      default: null,
    },

    currentHash: {
      type: String,
      required: true,
    },

    ipAddress: {
      type: String,
    },

    remarks: {
      type: String,
    },

    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

chainSchema.index({ caseId: 1, timestamp: -1 });

export default mongoose.model("ChainOfCustody", chainSchema);