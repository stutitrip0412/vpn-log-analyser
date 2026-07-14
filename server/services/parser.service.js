import fs from "fs";
import readline from "readline";
import ParserError from "../models/parserError.model.js";
import LogEntry from "../models/logEntry.model.js";
import { openVPNRegex } from "../utils/regex.js";
import { generateHash } from "../utils/hash.js";
import { getGeoLocation } from "./geo.service.js";

const BATCH_SIZE = 1000;

const parseOpenVPNLog = async (filePath, uploadedBy = null) => {
  const stream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let batch = [];

  let totalLines = 0;

  let parsedLogs = 0;

  let skippedLogs = 0;

  let failedLogs = 0;

  const startTime = Date.now();

  for await (const line of rl) {
    totalLines++;

    try {
      if (!line.trim()) {
        skippedLogs++;
        continue;
      }

      const match = line.match(openVPNRegex.connection);

      if (!match) {
        skippedLogs++;
        continue;
      }

      const timestamp = new Date(match[1]);

      const username = match[2];

      const sourceIp = match[3];

      let vpnAssignedIp = null;

      const assigned = line.match(openVPNRegex.assignedIp);

      if (assigned) vpnAssignedIp = assigned[1];

      let action = null;

      if (line.includes("Peer Connection Initiated"))
        action = "CONNECT";

      if (line.includes("Connection Reset"))
        action = "DISCONNECT";

      if (!action) {
        skippedLogs++;
        continue;
      }

      const status =
        line.includes("FAILED") || line.includes("AUTH_FAILED")
          ? "FAILED"
          : "SUCCESS";

      const geo = getGeoLocation(sourceIp);

      const hash = generateHash(
        JSON.stringify({
          timestamp,
          username,
          sourceIp,
          vpnAssignedIp,
          action,
          status,
        })
      );

      batch.push({
        timestamp,
        username,
        sourceIp,
        vpnAssignedIp,
        country: geo.country,
        city: geo.city,
        latitude: geo.latitude,
        longitude: geo.longitude,
        protocol: "OpenVPN",
        action,
        status,
        sessionId: `${username}-${Date.now()}`,
        logHash: hash,
        uploadedBy,
      });

      parsedLogs++;

      if (batch.length >= BATCH_SIZE) {
        await LogEntry.insertMany(batch);

        batch = [];
      }
    } catch (error) {
      failedLogs++;
      

await ParserError.create({
  lineNumber: totalLines,
  rawLine: line,
  reason: error.message,
});
    }
  }

  if (batch.length > 0) {
    await LogEntry.insertMany(batch);
  }

  const endTime = Date.now();

  return {
    vpnType: "OpenVPN",

    totalLines,

    parsedLogs,

    skippedLogs,

    failedLogs,

    processingTime: `${(
      (endTime - startTime) /
      1000
    ).toFixed(2)} sec`,
  };
};

export default parseOpenVPNLog;