import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [js.configs.recommended, pluginReact.configs.flat.recommended, eslintConfigPrettier],
    rules: {
      // JavaScript
      'no-undef': 'error', // Check undefined variables
      'no-console': 'error', // Don't Allow console.logs
      'prefer-const': 'warn', // Use const whenever possible
      'no-var': 'error', // Don't allow var
      eqeqeq: ['error', 'always'], // Use === always
      semi: ['error', 'always'], // Force semi colon
      quotes: ['error', 'single'], // Force simple quotes

      // React
      'react/react-in-jsx-scope': 'off', // Is not necessary to import React from v17+
      'react/prop-types': 'off', // Don't user PropTypes
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error', // Show "variable is defined but never used"
      'react/jsx-no-duplicate-props': 'error', // Avoid duplicated props
      'react/self-closing-comp': 'warn', // Force auto-close componente whenever needed
    },
  },
]);
