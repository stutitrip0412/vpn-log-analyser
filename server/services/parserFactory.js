import fs from "fs";

export const detectVPNType = (filePath) => {
  const content = fs.readFileSync(filePath, "utf8");

  if (content.includes("Peer Connection Initiated")) {
    return "OpenVPN";
  }

  if (
    content.includes("Handshake") ||
    content.includes("wireguard")
  ) {
    return "WireGuard";
  }

  return "Unknown";
};