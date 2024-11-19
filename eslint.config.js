import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default [
  // Ignore patterns
  {
    ignores: ['node_modules', 'dist', 'build', 'public', 'coverage'],
  },

  // JavaScript files
  {
    files: ['**/*.{js,cjs,mjs}'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
  },

  // TypeScript files

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json', './vitest.config.ts'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
  },
]
