module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        glow: {
          50: '#faf5ff',
          500: '#a855f7',
          900: '#3f0f64',
        },
      },
      boxShadow: {
        neon: '0 0 20px rgba(168, 85, 247, 0.5)',
        'neon-lg': '0 0 40px rgba(168, 85, 247, 0.7)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}
