module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx"],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    //"prettier/prettier": "error",
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    // allow prop-spreading
    "react/jsx-props-no-spreading": "off",
    // allow jsx syntax in js files
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "no-console": "off",
    "no-alert": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
