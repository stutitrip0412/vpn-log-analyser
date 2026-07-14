import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true,
    },

    storedName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    vpnType: {
      type: String,
      enum: ["OpenVPN", "WireGuard", "Unknown"],
      default: "Unknown",
    },

    fileHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Upload",
  uploadSchema
);