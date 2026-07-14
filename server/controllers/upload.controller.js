import fs from "fs";

import Upload from "../models/upload.model.js";

import parseOpenVPNLog from "../services/parser.service.js";

import { generateHash } from "../utils/hash.js";

export const uploadLog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const buffer = fs.readFileSync(req.file.path);

    const fileHash = generateHash(buffer);

    await Upload.create({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      fileSize: req.file.size,
      uploadedBy: null, // JWT user later
      vpnType: "OpenVPN",
      fileHash,
    });

    const report = await parseOpenVPNLog(
      req.file.path,
      null
    );

    return res.status(200).json({
      success: true,

      message: "VPN Log Parsed Successfully",

      report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};