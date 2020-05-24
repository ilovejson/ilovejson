module.exports = {
  purge: ['./src/components/**/*.jsx', './pages/**/*.jsx'],
  theme: {
    extend: {},
  },
  variants: {
    resize: ['responsive', 'hover', 'focus'],
    boxSizing: ['responsive', 'hover', 'focus'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
}
