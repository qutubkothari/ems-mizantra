const apiOrigin = (process.env.EMS_TEST_API_URL || 'https://mizantra.saksolution.com').replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // EMS owns the browser-facing contract; this translation preserves the
      // existing shared test API while the backend is still shared with Mizantra.
      { source: '/api/v1/ems/:path*', destination: `${apiOrigin}/api/v1/crm/:path*` },
      { source: '/api/v1/auth/:path*', destination: `${apiOrigin}/api/v1/auth/:path*` },
    ];
  },
};

export default nextConfig;
