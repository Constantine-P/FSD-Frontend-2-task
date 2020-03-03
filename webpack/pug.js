module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: ['html-loader', 'pug-html-loader'],
        },
      ],
    },
  };
};
