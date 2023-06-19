module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require("postcss-nested"),
    ...(process.env.JEKYLL_ENV == 'production'
      ? [require('cssnano')({ preset: 'default' })]
      : [])
  ]
}

