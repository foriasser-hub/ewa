import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS configuration for AKADEMIA IA MADAGASIKARA.
 *
 * Brand palette:
 *  - navy:   primary brand colour (deep navy blue)
 *  - ink:    body text (dark anthracite)
 *  - muted:  secondary text (soft grey)
 *  - paper:  off-white background (subtle warmth, not pure white)
 *  - white:  pure white surfaces
 *  - gold:   sparingly used accent (badges, highlights) — optional
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        navy: {
          50: '#EEF2FB',
          100: '#D6DEF2',
          200: '#A9B7E0',
          300: '#7B90CD',
          400: '#4F6BB8',
          500: '#2D4A8A',
          600: '#1E3A8A',
          700: '#102A56',
          800: '#0A1F44',
          900: '#06152F',
        },
        ink: '#1F2937',
        muted: '#6B7280',
        paper: '#F7F9FC',
        gold: '#F4C46B',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 31, 68, 0.04), 0 8px 24px rgba(10, 31, 68, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
