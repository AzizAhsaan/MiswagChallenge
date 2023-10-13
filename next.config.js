/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    ...nextConfig, // Keep the existing nextConfig
    images: {
      domains: ['cdn.miswag.me'], // Add the hostname(s) here
    },
  };