import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:prettier/recommended', // ⬅️ Add this last
    ],
    ignorePatterns: ['app/generated/**/**'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      curly: ['error', 'all'],
      'no-multi-spaces': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      // ⛔ Turn off rules that conflict with Prettier
      'prettier/prettier': 'error',
    },
  }),
];

export default eslintConfig;
