import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
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
      prettier: pluginPrettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
      eslintConfigPrettier, // Apaga reglas que chocan con Prettier
    ],
    rules: {
      // Prettier como regla de error
      'prettier/prettier': 'error',

      // JavaScript
      'no-undef': 'error',
      'no-console': 'error',
      'prefer-const': 'warn',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/self-closing-comp': 'warn',
    },
  },
]);