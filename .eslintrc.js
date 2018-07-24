module.exports = {
  "extends": ["plugin:prettier/recommended"],
  "rules": {
    "sort-keys": "warn",
    "import/no-default-export": "error",
    "import/prefer-default-export": 0,
    "import/order": ["error", {"newlines-between": "always"}]
  }
};
