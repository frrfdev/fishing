/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': {
            'box-shadow': '0 0 0 var(--glow-color)',
            opacity: '1',
          },
          '50%': {
            'box-shadow': '0 0 20px var(--glow-color)',
            opacity: '0.8',
          },
        },
        pendulum: {
          '0%, 100%': {
            transform: 'rotate(-10deg)',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          },
          '50%': {
            transform: 'rotate(10deg)',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          },
        },
        alert: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '25%': {
            transform: 'scale(1.1)',
            opacity: '0.9',
          },
          '50%': {
            transform: 'scale(1)',
            opacity: '0.8',
          },
          '75%': {
            transform: 'scale(1.2)',
            opacity: '1',
          },
        },
        reeling: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
        pendulum: 'pendulum 1.5s ease-in-out infinite',
        alert: 'alert 0.5s ease-in-out infinite',
        reeling: 'reeling 2s linear',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const colors = theme('colors');
      const glowUtilities = {};

      // Create utilities for each color and its shades
      Object.entries(colors).forEach(([colorName, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([shade, hex]) => {
            glowUtilities[`.glow-${colorName}-${shade}`] = {
              '--glow-color': hex,
            };
          });
        } else {
          glowUtilities[`.glow-${colorName}`] = {
            '--glow-color': value,
          };
        }
      });

      addUtilities(glowUtilities);
    },
  ],
};
