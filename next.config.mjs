/** @type {import('next').NextConfig} */
const nextConfig = {
  // The dev server only serves its scripts to localhost by default. Without
  // these, opening it at 127.0.0.1, a LAN address (e.g. from a phone), or a
  // Tailscale address loads the HTML but never hydrates, so client-side
  // buttons do nothing.
  allowedDevOrigins: [
    "127.0.0.1",
    "192.168.*.*",
    "100.*.*.*",
    "johnnypc",
    "johnnypc.tail073a44.ts.net",
  ],
  // Project photos served from the R2 bucket go through next/image.
  images: {
    remotePatterns: [new URL("https://pub-e8e289d8d33e4c5ea574ea0ee67999a3.r2.dev/projects/**")],
  },
};

export default nextConfig;
