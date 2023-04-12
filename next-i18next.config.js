const path = require("path");

module.exports = {
  i18n: {
    locales: ["sk", "en"],
    defaultLocale: "sk",
    localeDetection: false,
  },
  localePath: path.resolve("./public/locales"),
};
