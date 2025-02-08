export default {
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-extra-semi': 'error',
    'no-irregular-whitespace': 'error',
    'array-callback-return': 'error',
    'consistent-return': 'error',
    curly: [
      'error',
      'multi-line',
    ],
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore',
      },
    ],
    'no-alert': 'error',
    'no-caller': 'error',
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-return-assign': [
      'error',
      'always',
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'no-useless-concat': 'error',
    'no-shadow': 'error',
    'no-undef': 'error',
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'array-bracket-spacing': [
      'error',
      'never',
    ],
    'block-spacing': [
      'error',
      'always',
    ],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'func-call-spacing': [
      'error',
      'never',
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'jsx-quotes': [
      'error',
      'prefer-single',
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'linebreak-style': [
      'error',
      'windows',
    ],
    'max-len': [
      'error',
      {
        code: 180,
        ignoreComments: true,
      },
    ],
    'new-cap': [
      'error',
      {
        newIsCap: true,
      },
    ],
    'no-mixed-operators': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'quote-props': [
      'error',
      'as-needed',
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: [
      'error',
      'always',
    ],
    'space-before-blocks': [
      'error',
      'always',
    ],
    'space-before-function-paren': [
      'error',
      'never',
    ],
    'space-infix-ops': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: [
          '/',
        ],
      },
    ],
    'arrow-body-style': [
      'error',
      'as-needed',
    ],
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'no-var': 'error',
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
    'prefer-template': 'error',
  },
};
