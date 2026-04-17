/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
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
        'white-soft': '#f8f8f2'
      },
      spacing: {
        '1': '0.5rem',
        '2': '0.875rem',
        '3': '1rem',
        '4': '1.5rem',
        '5': '2rem',
        '6': '3rem',
        '7': '4.5rem'
      },
      borderRadius: {
        lg: '22px',
        md: '14px'
      },
      boxShadow: {
        brand: '0 18px 45px rgba(17, 17, 17, 0.08)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
