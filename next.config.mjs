/** @type {import('next').NextConfig} */
const nextConfig = {
  // The dev server only serves its scripts to localhost by default. Without
  // these, opening it at 127.0.0.1 or a LAN address (e.g. from a phone) loads
  // the HTML but never hydrates, so client-side buttons do nothing.
  allowedDevOrigins: ["127.0.0.1", "192.168.*.*"],
};

export default nextConfig;
