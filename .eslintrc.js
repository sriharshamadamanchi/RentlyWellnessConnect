module.exports = {
  root: true,
  "extends": [
    "eslint:all",
    "plugin:react/all",
    '@react-native-community',
  ],
  "settings": {
    "react": {
      "version": require('./package.json').dependencies.react
    },
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".android.js", ".ios.js", ".svg", ".ts"]
      }
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  "plugins": [
    "react",
    "header",
    "import",
    "flowtype",
    "unused-imports",
    "flow-vars"
  ],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "flowtype/type-id-match": [
      2,
      "^([a-z][a-zA-Z0-9]*)+Type$"
    ],
    "flowtype/boolean-style": [
      2,
      "boolean"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/delimiter-dangle": [
      2,
      "never"
    ],
    "flowtype/generic-spacing": [
      2,
      "never"
    ],
    "flowtype/no-mixed": 2,
    "flowtype/no-primitive-constructor-types": 2,
    "flowtype/no-types-missing-file-annotation": 2,
    "flowtype/no-weak-types":  [
      2, {
        "any": false,
        "Object": false,
        "Function": true
      }
    ],
    "flowtype/object-type-delimiter": [
      2,
      "comma"
    ],
    "flowtype/require-parameter-type": 2,
    "flowtype/require-readonly-react-props": 0,
    "flowtype/require-return-type": [
      0,
      "always",
      {
        "annotateUndefined": "never"
      }
    ],
    "flowtype/require-valid-file-annotation": 2,
    "flowtype/semi": [
      2,
      "always"
    ],
    "flowtype/space-after-type-colon": [
      2,
      "always"
    ],
    "flowtype/space-before-generic-bracket": [
      2,
      "never"
    ],
    "flowtype/space-before-type-colon": [
      2,
      "never"
    ],
    "flowtype/union-intersection-spacing": [
      2,
      "always"
    ],
    "flowtype/use-flow-type": 1,
    "flowtype/valid-syntax": 1,
    "react/function-component-definition":0,
    "unused-imports/no-unused-imports": 2,
    "unused-imports/no-unused-vars": 0,
    "react/no-unused-prop-types": 0,
    "no-process-env": 0,
    "no-process-exit": 0,
    "import/no-unresolved": [2, { "commonjs": true, "amd": true }],
    "import/newline-after-import": 2,
    "react/prop-types": 0,
    "eslint-comments/no-unlimited-disable":0,
    "react/no-this-in-sfc": 0,
    "no-lone-blocks": 0,
    "function-call-argument-newline": 0,
    "no-console": 0,
    "no-undef": 2,
    "default-param-last": 0,
    "no-unused-vars": 0,
    "require-yield": 0,
    "no-unreachable": 2,
    "no-constant-condition": 0,
    "react/jsx-no-duplicate-props": 2,
    "no-case-declarations": 0,
    "react/no-unescaped-entities": 0,
    "no-dupe-keys": 2,
    "no-empty": 2,
    "no-mixed-spaces-and-tabs": 2,
    "react/display-name": 0,
    "react/jsx-key": 2,
    "react/no-string-refs": 0,
    "react/no-children-prop": 2,
    "react/no-direct-mutation-state": 0,
    "array-bracket-spacing": 0,
    "block-spacing": 0,
    "brace-style": 2,
    "camelcase": 0,
    "comma-dangle":0,
    "comma-spacing": ["error", { "before": false, "after": true }],
    "arrow-body-style": 0,
    "arrow-parens": 2,
    "arrow-spacing": 2,
    "constructor-super": 2,
    "generator-star-spacing": 2,
    "no-confusing-arrow": 2,
    "no-const-assign": 2,
    "react/jsx-props-no-spreading": 0,
    "react/state-in-constructor": 0,
    "prefer-named-capture-group": 0,
    "react/static-property-placement": 0,
    "no-dupe-class-members": 2,
    "no-duplicate-imports": 2,
    "no-this-before-super": 2,
    "no-useless-constructor": 2,
    "no-var": 2,
    "prefer-arrow-callback": 2,
    "prefer-const": 2,
    "prefer-destructuring": [
      "error", {
        "VariableDeclarator": {
          "array": false,
          "object": true
        },
        "AssignmentExpression": {
          "array": false,
          "object": false
        }
      }
    ],
    'prettier/prettier': 0,
    "prefer-template": 2,
    "rest-spread-spacing": 2,
    "sort-imports": [
      "error", {
        "ignoreCase": false,
        "ignoreDeclarationSort": true,
        "ignoreMemberSort": false,
        "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
      }
    ],
    "react/no-deprecated": 0,
    "radix": 2,
    "strict": 2,
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1
      }
    ],
    "no-useless-escape": 0,
    "sort-keys": 0,
    "react/jsx-sort-default-props": 0,
    "react/jsx-indent": 0,
    "indent": [
      "error", 2, {
        "ignoredNodes": ["TemplateLiteral"]
      }
    ],
    "no-ternary": 0,
    "react/forbid-component": 0,
    "multiline-ternary": 0,
    "max-len": 0,
    "react/destructuring-assignment": 0,
    "no-return-assign": 0,
    "no-use-before-define": 0,
    "react/jsx-no-bind": 0,
    "react/jsx-max-depth": 0,
    "react/forbid-component-props": 0,
    "react/jsx-handler-name": 0,
    "react/no-set-state": 0,
    "no-invalid-this": 0,
    "no-negated-condition": 0,
    "no-magic-numbers": 0,
    "sort-vars": 0,
    "no-bitwise": 0,
    "no-lonely-if": 0,
    "react/jsx-no-literals": 0,
    "max-lines-per-function": 0,
    "react/jsx-filename-extension": 0,
    "no-mixed-operators": 0,
    "consistent-return": 0,
    "require-unicode-regexp": 0,
    "react/sort-comp": 0,
    "max-lines": 0,
    "global-require": 0,
    "react/no-access-state-in-setstate": 0,
    "one-var": 0,
    "react/no-multi-comp": 0,
    "no-unused-expressions": 0,
    "max-statements-per-line": 0,
    "no-nested-ternary": 0,
    "max-classes-per-file": [2, 1],
    "line-comment-position": 0,
    "no-inline-comments": 0,
    "react/prefer-stateless-function": 2,
    "no-shadow": 0,
    "id-length": 0,
    "max-statements": 0,
    "prefer-promise-reject-errors": 0,
    "no-plusplus": 0,
    "max-params": 0,
    "react/no-unused-state": 0,
    "consistent-this": 0,
    "no-warning-comments": 0,
    "no-underscore-dangle": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-indent-props": 0,
    "require-await": 0,
    "init-declarations": 0,
    "react/require-optimization": 0,
    "react/jsx-handler-names": 0,
    "class-methods-use-this": 0,
    "no-extra-parens": 0,
    "quotes": 0,
    "react/jsx-fragments": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/no-unstable-nested-components": 0,
    "react/prefer-exact-props": 0,
    "react/jsx-newline": 0,
    "eqeqeq": 2,
    "quote-props": 0,
    "func-style": 0,
    "no-await-in-loop": 0,
    "require-atomic-updates": 0,
    "no-continue": 0,
    "no-trailing-spaces": 2,
    "no-empty-function": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-tag-spacing": 0,
    "react/jsx-closing-tag-location": 0,
    "react/no-did-mount-set-state": 0,
    "react/jsx-first-prop-new-line": 0,
    "space-infix-ops": 0,
    "react/jsx-wrap-multilines": 0,
    "key-spacing": 0,
    "react/jsx-curly-brace-presence": 0,
    "no-undefined": 0,
    "func-names": 0,
    "react/jsx-equals-spacing": [2, "always"],
    "no-sequences": 0,
    "complexity": 0,
    "handle-callback-err": 0,
    "no-loop-func": 0,
    "vars-on-top": 0,
    "array-callback-return": 0,
    "max-depth": 0,
    "no-alert": 0,
    "default-case": 0,
    "react/no-array-index-key": 0,
    "no-param-reassign": 0,
    "func-name-matching": 0,
    "object-property-newline": 0,
    "callback-return": 0,
    "no-unexpected-multiline": 0,
    "no-tabs": 0,
    "new-cap": 0,
    "react/require-default-props": 0,
    "react/jsx-max-props-per-line": 0,
    "array-bracket-newline": ["error", { "multiline": true }],
    "object-curly-spacing": ["error", "always"],
    "react/forbid-foreign-prop-types": 0,
    "react/forbid-prop-types": 0,
    "no-mixed-requires": 0,
    "no-prototype-builtins": 0,
    "no-eq-null": 0,
    "no-proto":0,
    "react/default-props-match-prop-types": 0,
    "no-multi-assign": 0,
    "react/jsx-pascal-case": 0,
    "array-element-newline": 0,
    "object-curly-newline": 0,
    "padded-blocks": 0,
    "dot-location": 0,
    "wrap-iife": 0,
    "func-call-spacing": 2,
    "newline-per-chained-call": 0,
    "function-paren-newline": 0,
    "lines-around-comment": 2,
    "capitalized-comments": 0,
    "implicit-arrow-linebreak": 0,
    "eol-last": 2,
    "keyword-spacing": 2,
    "no-buffer-constructor": 0,
    "no-async-promise-executor": 0,
    "padding-line-between-statements": [2, { "blankLine": "always", "prev": "*", "next": "return" }]
  }
};
