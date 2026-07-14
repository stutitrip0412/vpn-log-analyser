import mongoose from "mongoose";

const logEntrySchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
      index: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    sourceIp: {
      type: String,
      required: true,
      index: true,
    },

    vpnAssignedIp: {
      type: String,
    },

    country: {
      type: String,
      default: "Unknown",
      index: true,
    },

    city: {
      type: String,
      default: "Unknown",
    },

    latitude: Number,

    longitude: Number,

    protocol: {
      type: String,
      enum: ["OpenVPN", "WireGuard"],
      required: true,
    },

    action: {
      type: String,
      enum: ["CONNECT", "DISCONNECT"],
      required: true,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: true,
      index: true,
    },

    sessionId: {
      type: String,
      index: true,
    },

    logHash: {
      type: String,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

logEntrySchema.index({ username: 1, timestamp: -1 });

logEntrySchema.index({ sourceIp: 1, timestamp: -1 });



export default mongoose.model("LogEntry", logEntrySchema);