/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        green: '#79b927',
        'green-dark': '#5f931f',
        yellow: '#d7b84b',
        black: '#111111',
        text: '#1f241c',
        muted: '#5f6758',
        surface: '#f8f9f4',
        'surface-soft': '#f4f6ef',
        'surface-strong': '#e9efdd',
        line: '#d8e0cb',
        'white-soft': '#f8f8f2',
        panel: 'rgba(248, 249, 244, 0.84)',
        'panel-strong': 'rgba(255, 255, 251, 0.9)',
        border: 'rgba(121, 185, 39, 0.16)',
        'border-strong': 'rgba(95, 147, 31, 0.24)',
        brand: '#79b927',
        'brand-strong': '#5f931f',
        accent: '#d7b84b',
        danger: '#b42318',
      },
      spacing: {
        1: '0.5rem',
        2: '0.875rem',
        3: '1rem',
        4: '1.5rem',
        5: '2rem',
        6: '3rem',
        7: '4.5rem',
      },
      borderRadius: {
        lg: '22px',
        md: '14px',
        sm: '12px',
      },
      boxShadow: {
        brand: '0 18px 45px rgba(17, 17, 17, 0.08)',
        soft: '0 24px 60px rgba(17, 17, 17, 0.11)',
        card: '0 16px 34px rgba(17, 17, 17, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
