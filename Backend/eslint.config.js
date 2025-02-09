import globals from 'globals';
import pluginJs from '@eslint/js';
import customRules from './eslint-rules.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      ...customRules,
    },
  },
  pluginJs.configs.recommended,
];
