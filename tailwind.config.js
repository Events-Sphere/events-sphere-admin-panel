/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    colors:{
      'blue':'#0a2455',
      'grey':'#f5f6fa',
      'white':'#ffffff',
      'dark-blue':'#081d45',
      'sky-blue':'#2697ff',
      'red':'#dc3545',
      'bg' : '#b4c6d0',
      'green' :  '#a3ffb4',
      'primary': '#1E40AF', 
      'secondary': '#1E3A8A', 
      'accent': '#2563EB', 
      'background': '#F3F4F6', 
      'border': '#E5E7EB', 
      'black':'#000000',
      'dark-blue': '#1E3A8A',
      'light-blue': '#3B82F6',
      'dark-gray': '#374151',
      'light-gray': '#D1D5DB',
      'red-700' : '#6c0c02',
      'red-100' : '#c2857f',
      'green-100':'#a7e4aa',
      'green-700': '#03a10b',
      'slate-500' : '#64748b',
      'slate-300' : '#cbd5e1',

    }
  },
  plugins: [],
}

