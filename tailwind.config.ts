import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#0E6B55',
        forestDark: '#0A4F3F',
        ochre: '#C68A42',
        ochreLight: '#DDA766',
        sage: '#C7CFC0',
        sageLight: '#EEF1EA',
        clay: '#E9DCD3',
        clayDark: '#C9A891',
        linen: '#FAFAF7',
        surface: '#F2F1EB',
        ink: '#1E1D1B',
        inkMuted: '#5C594F',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        arch: '50% 50% 0 0 / 60% 60% 0 0',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
