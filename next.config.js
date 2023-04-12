require("dotenv").config();
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n,
};

module.exports = nextConfig;
