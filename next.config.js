require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["sk", "en"],
    defaultLocale: "sk",
  },
};

module.exports = nextConfig;
