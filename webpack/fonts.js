const path = require('path');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(woff(2)?|ttf|eot|svg)$/,
          include: [
            path.join(__dirname, '..', 'source', 'fonts'),
          ],
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        },
      ],
    },
  };
};
