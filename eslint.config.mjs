import { fileURLToPath } from 'url'
import { dirname } from 'path'
import globals from 'globals'
import js from '@eslint/js'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettierPlugin from 'eslint-plugin-prettier'
import jest from 'eslint-plugin-jest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
  {
    files: ['**/*.{js,ts,tsx}'],
    ignores: ['*/client/playwright.config.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        it: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        indexedDB: 'readonly',
        describe: 'readonly',
      },
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      jest,
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      ...js.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['packages/client/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./packages/client/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    files: ['packages/server/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./packages/server/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
  },
  // {
  //   files: [
  //     'packages/**/__tests__/**/*.{ts,tsx}',
  //     'packages/**/*.(unit-test|int-test|e2e-test).{ts,tsx}',
  //   ],
  //   env: {
  //     jest: true,
  //   },
  // },
]
