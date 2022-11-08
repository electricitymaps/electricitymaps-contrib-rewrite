const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['index.html', 'src/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
    },
    fontSize: {
      sm: '0.75rem',
    },
    extend: {
      boxShadow: {
        '2xl': '0.1px 0.1px 6px rgba(0, 0, 0, 0.16)',
      },
      fontSize: {
        xs: '0.6rem',
        sm: '0.75rem',
        md: '0.8rem',
        lg: '1rem',
        xl: '1.25rem',
      },
    },
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin],
};
module.exports = config;
