export default {
  rules: {
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'padded-blocks': ['error', 'never'],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-multi-spaces': ['error', { ignoreEOLComments: false }],
    'no-extra-semi': 'error',
    'no-irregular-whitespace': 'error',
    'array-callback-return': 'error',
    'consistent-return': 'error',
    curly: ['error', 'multi-line'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-alert': 'error',
    'no-caller': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'no-return-assign': ['error', 'always'],
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'no-useless-concat': 'error',
    'no-shadow': 'error',
    'no-undef': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'comma-spacing': ['error', { before: false, after: true }],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'jsx-quotes': ['error', 'prefer-single'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'linebreak-style': ['error', 'windows'],
    'max-len': ['error', { code: 180, ignoreComments: true }],
    'new-cap': ['error', { newIsCap: true }],
    'no-mixed-operators': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'space-infix-ops': 'error',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-template': 'error',
    'react/boolean-prop-naming': ['error', { rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+' }],
    'react/button-has-type': 'error',
    'react/default-props-match-prop-types': ['error', { allowRequiredDefaults: false }],
    'react/destructuring-assignment': ['error', 'always'],
    'react/display-name': 'off',
    'react/forbid-component-props': ['error', { forbid: ['className', 'style'] }],
    'react/forbid-dom-props': ['error', { forbid: ['id'] }],
    'react/forbid-elements': ['off'],
    'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],
    'react/forbid-prop-types': ['error', { forbid: ['any', 'array', 'object'] }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'react/hook-use-state': 'error',
    'react/iframe-missing-sandbox': 'error',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-child-element-spacing': 'off',
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never', propElementValues: 'always' },
    ],
    'react/jsx-curly-newline': ['error', { multiline: 'consistent', singleline: 'consistent' }],
    'react/jsx-curly-spacing': ['error', { when: 'never', attributes: true, children: true }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-fragments': ['error', 'syntax'],
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-key': 'error',
    'react/jsx-max-depth': ['warn', { max: 5 }],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-no-leaked-render': ['error', { validStrategies: ['coerce', 'ternary'] }],
    'react/jsx-no-literals': ['off', { noStrings: true }],
    'react/jsx-no-script-url': 'error',
    'react/jsx-no-target-blank': ['error', { allowReferrer: true, enforceDynamicLinks: 'always' }],
    'react/jsx-no-undef': ['error', { allowGlobals: true }],
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-props-no-spreading': ['off', { html: 'enforce', custom: 'enforce' }],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    'react/jsx-no-useless-fragment': 'error',
    'react/no-adjacent-inline-elements': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-arrow-function-lifecycle': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-invalid-html-attribute': 'error',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-redundant-should-component-update': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/no-unsafe': ['error', { checkAliases: true }],
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/no-will-update-set-state': 'error',
    'react/prefer-es6-class': ['error', 'always'],
    'react/prefer-read-only-props': 'error',
    'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
    'react/prop-types': ['error', { ignore: [], customValidators: [], skipUndeclared: false }],
    'react/react-in-jsx-scope': 'off', // Not needed in Next.js or React 17+
    'react/require-default-props': ['error', { forbidDefaultForRequired: true }],
    'react/require-optimization': ['off'],
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-variables',
          'static-methods',
          'lifecycle',
          'everything-else',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'constructor',
            'getDerivedStateFromProps',
            'componentDidMount',
            'shouldComponentUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],
    'react/state-in-constructor': ['error', 'always'],
    'react/static-property-placement': ['error', 'property assignment'],
    'react/style-prop-object': 'error',
    'react/void-dom-elements-no-children': 'error',

    // React Hooks
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
  },
};
