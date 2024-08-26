// tailwind.config.js or tailwind.config.ts
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'gradient-1': 'linear-gradient(45deg, #ff7e5f, #feb47b)',
        'gradient-2': 'linear-gradient(45deg, #6a11cb, #2575fc)',
        'rotating-gradient': 'linear-gradient(270deg, #ff7e5f, #feb47b, #6a11cb, #2575fc, #ff6a00, #ee0979)',
        'gradient-3': 'linear-gradient(45deg, #ff6a00, #ee0979)',
      },
      fontFamily: {
        'jersey': ['"Jersey 10"', 'sans-serif'],
      },
      keyframes: {
        'border-gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'bg-gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
         rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bg-rotate': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 5s ease infinite',
        'border-gradient': 'border-gradient 3s ease infinite',
        'bg-gradient': 'bg-gradient 3s ease infinite',
        rotate: 'rotate 5s linear infinite',
         'bg-rotate': 'bg-rotate 8s linear infinite',
      },
      boxShadow: {
        'rgb': '0 4px 6px rgba(255, 0, 0, 0.5), 0 10px 15px rgba(0, 255, 0, 0.3), 0 20px 25px rgba(0, 0, 255, 0.2)',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.bg-size-200': {
          'background-size': '200% 200%',
        },
        '.bg-pos-0': {
          'background-position': '0% 0%',
        },
        '.hover\\:bg-pos-100:hover': {
          'background-position': '100% 0%',
        },
      });
    }),
  ],
};

export default config;
