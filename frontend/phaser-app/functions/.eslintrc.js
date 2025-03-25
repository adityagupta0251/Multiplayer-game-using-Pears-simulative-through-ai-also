const path = require("path");

module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: "module",
  },
  // Exclude files that aren’t in tsconfig.json (like this config file)
  ignorePatterns: [
    ".eslintrc.js",
    "/lib/**/*",      // Ignore built files.
    "/generated/**/*", // Ignore generated files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
  },
};
