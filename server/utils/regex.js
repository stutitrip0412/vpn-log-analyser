export const openVPNRegex = {
  connection:
    /^(.+?)\s+([A-Za-z0-9_-]+)\/(\d+\.\d+\.\d+\.\d+)/,

  assignedIp:
    /IPv4=([\d.]+)/,

  connectionReset:
    /Connection Reset/,
};