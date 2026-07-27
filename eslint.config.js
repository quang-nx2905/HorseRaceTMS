import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // The application intentionally initializes modal state and starts API
      // polling from effects. These React Compiler advisory rules would require
      // behavior-changing rewrites in this non-compiler project.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      // Context modules export both a provider and their matching hook.
      'react-refresh/only-export-components': 'off',
    },
  },
])
