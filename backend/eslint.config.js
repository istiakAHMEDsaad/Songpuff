import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // General
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-console": "off",
      "prefer-const": "error",
      "no-duplicate-imports": "error",
      "no-useless-return": "error",
      eqeqeq: ["error", "always"],
    },
  },

  {
    ignores: ["node_modules/**", "dist/**", "coverage/**"],
  },
];
