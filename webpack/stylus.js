const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.styl$|\.css$/,
          include: paths,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader',
          ],
        },
      ],
    },
  };
};
