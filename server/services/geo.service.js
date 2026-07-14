import geoip from "geoip-lite";

export const getGeoLocation = (ip) => {
  const geo = geoip.lookup(ip);

  if (!geo) {
    return {
      country: "Unknown",
      city: "Unknown",
      latitude: null,
      longitude: null,
    };
  }

  return {
    country: geo.country,
    city: geo.city || "Unknown",
    latitude: geo.ll[0],
    longitude: geo.ll[1],
  };
};