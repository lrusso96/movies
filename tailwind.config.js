module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/**/*.md',
    './*.md',
    './*.html',
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('white'),
              '&:hover': {
                color: theme('colors.amber.300')
              }
            },
            blockquote: {
              border: 'none',
              p: {
                marginBottom: "0.4rem",
                position: 'relative'
              },
              cite: {
                fontStyle: "normal"
              }
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
              position: 'absolute',
              left: '-1.4rem',
//              top: '-1.1rem'
            },
            'blockquote p:first-of-type::after': {
              content: 'close-quote',
              marginLeft: '0.2rem'
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}
