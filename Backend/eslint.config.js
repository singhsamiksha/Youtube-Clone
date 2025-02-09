/* eslint-disable import/no-nodejs-modules */
import path from 'path';
import globals from 'globals';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  pluginJs.configs.recommended,
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('airbnb-base'),
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
      'max-len': ['error', 180],
      'no-underscore-dangle': 'off',
      'no-param-reassign': ['error', { props: false }],
      'no-plusplus': 'off',
      'linebreak-style': 0,
      camelcase: 'off',
      indent: ['error', 2],
      semi: ['error', 'always'],
    },
  },
];
