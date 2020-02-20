module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(ttf|eot|woff)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    },
                },
            ],
        },
    };
};
