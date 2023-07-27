module.exports = {
  env: {
    es2021: true,
  },

  parserOptions: {
    ecmaVersion: "latest",
  },

  rules: {
    "semi": ["warn", "always"],
    "quotes": ["warn", "double"],
    "no-multiple-empty-lines": "error",
    "key-spacing": ["error", { afterColon: true }],

    "no-global-assign": "error",
    "no-cond-assign": ["warn", "always"],
    "id-length": ["warn", { max: 10 }],
    "max-statements": ["warn", 15],

    "multiline-ternary": ["warn", "never"],
    "no-unneeded-ternary": ["error", { defaultAssignment: false }],
    "no-nested-ternary": "error",

    "space-infix-ops": "warn",
    "space-before-blocks": ["warn", "always"],
    "no-mixed-operators": "error",

    "camelcase": ["error", { properties: "never" }],
    "new-cap": ["error", { newIsCap: true }],
    "prefer-const": "error",
  },
};
