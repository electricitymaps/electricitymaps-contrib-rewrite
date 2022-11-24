const defaultConfig = require('tailwindcss/defaultConfig');
const formsPlugin = require('@tailwindcss/forms');

/** @type {import('tailwindcss/types').Config} */
const config = {
  content: ['index.html', 'src/**/*.tsx'],
  theme: {
    extend: {
      boxShadow: {
        '2xl': '0.1px 0.1px 5px rgba(0, 0, 0, 0.1)',
        '3xl': '0.1px 0.1px 6px rgba(0, 0, 0, 0.15);',
      },
      colors: {
        'brand-green': '#126846',
        'brand-yellow': '#E9B73B',
        'brand-brown': '#702214',
        'brand-green-100': 'rgb(18, 104, 70,0.1)',
        'brand-green-200': 'rgb(18, 104, 70,0.2)',
        'brand-green-300': 'rgb(18, 104, 70,0.3)',
        'brand-green-400': 'rgb(18, 104, 70,0.4)',
        'brand-green-500': 'rgb(18, 104, 70,0.5)',
        'brand-green-600': 'rgb(18, 104, 70,0.6)',
        'brand-green-700': 'rgb(18, 104, 70,0.7)',
        'brand-green-800': 'rgb(18, 104, 70,0.8)',
        'brand-green-900': 'rgb(18, 104, 70,0.9)',
        'bg-dark': 'rgb(17 24 39,800)',
      },
    },
    fontFamily: {
      sans: ['Inter', ...defaultConfig.theme.fontFamily.sans],
      poppins: ['Poppins', ...defaultConfig.theme.fontFamily.sans],
      inter: ['Inter', ...defaultConfig.theme.fontFamily.sans],
    },
    fontSize: {
      xs: '0.6rem',
      sm: '0.75rem',
      md: '0.8rem',
      base: '0.875rem',
      lg: '1.3rem',
      xl: '1.5rem',
    },
  },
  experimental: { optimizeUniversalDefaults: true },
  plugins: [formsPlugin],
};
module.exports = config;
