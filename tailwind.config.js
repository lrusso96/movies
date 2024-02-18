module.exports = {
  darkMode: 'class',
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
