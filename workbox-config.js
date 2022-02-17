module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{png,js,css,svg,ico,jpg,html,mp3}'],
  swDest: 'dist/sw.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
