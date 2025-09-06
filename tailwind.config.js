/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        'brand-green': 'var(--color-brand-green)',
        'brand-green-soft': 'var(--color-brand-green-soft)',
        'brand-green-extra': 'var(--color-brand-green-extra)',
        'brand-green-bright': 'var(--color-brand-green-bright)',
        'bg-dark': 'var(--color-bg-dark)',
        'bg-dark-gray': 'var(--color-bg-dark-gray)',
        'bg-gray': 'var(--color-bg-gray)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'basic-white': 'var(--color-basic-white)',
        'basic-black': 'var(--color-basic-black)',
        stroke: 'var(--color-stroke)',
      },
      backgroundImage: {
        'gradient-brand': 'var(--gradient-brand)',
        'gradient-brand-radial': 'var(--gradient-brand-radial)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.bg-gradient-brand-radial': {
          background: 'var(--brand-gradient-radial)',
        },
        '.bg-gradient-brand': {
          background: 'var(--gradient-brand)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
