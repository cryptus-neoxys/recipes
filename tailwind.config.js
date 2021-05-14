module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Roboto Slab']
      },
      minHeight: {
        '16':'4rem',
        '10':'2.5rem'
       },
      maxHeight: {
        'xl': '26.5rem'
       },
      maxWidth: {
        'xl': '47rem'
       },
      minWidth: {
        '16':'4rem',
        '10':'2.5rem'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
