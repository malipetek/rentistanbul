/** @type {import('tailwindcss').Config} */
import typoegraphy from '@tailwindcss/typography';
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkmode: 'class',
  theme: {
    extend: {
      colors: {
        'theme': 'rgb(41 135 149)'
      },
    },
  },
  plugins: [
    typoegraphy
  ],
}

