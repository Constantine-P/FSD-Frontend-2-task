const path = require('path');

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|svg|gif)$/,
          exclude: [
            path.resolve(__dirname, '../source/resources/fonts'),
          ],
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
        },
      ],
    },
  };
};
