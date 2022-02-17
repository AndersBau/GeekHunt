const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    //extend: {},
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: colors.black,
    //   white: colors.white,
    //   gray: colors.gray,
    //   emerald: colors.emerald,
    //   indigo: colors.indigo,
    //   yellow: colors.yellow,
    //   'gh-navy': '#2E4C6D',
    //   'gh-blue': '#396EB0',
    //   'gh-light': '#DADDFC',
    //   'gh-orange': '#FC997C',
    // },
    // screens: {
    //   '2xl': {'max': '1535px'},
    //   // => @media (max-width: 1535px) { ... }

    //   'xl': {'max': '1279px'},
    //   // => @media (max-width: 1279px) { ... }

    //   'lg': {'max': '1023px'},
    //   // => @media (max-width: 1023px) { ... }

    //   'md': {'max': '767px'},
    //   // => @media (max-width: 767px) { ... }

    //   'sm': {'max': '639px'},
    //   // => @media (max-width: 639px) { ... }
    // }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
