module.exports = {
  purge: ['./src/components/**/*.jsx', './pages/**/*.jsx'],
  theme: {
    extend: {},
    screens: {
      "sm": "576px",
      "md": "768px",
      "lg": "992px",
      "xl": "1200px"
    },
    textSizes: {
      "xs": ".75rem", // 12px
      "sm": ".875rem", // 14px
      "base": "1rem", // 16px
      "lg": "1.125rem", // 18px
      "xl": "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.25rem" // 52px
    },
    fontWeights: {
      "hairline": 100,
      "thin": 200,
      "light": 300,
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800,
      "black": 900
    },
  },
  variants: {},
  plugins: [],
}
