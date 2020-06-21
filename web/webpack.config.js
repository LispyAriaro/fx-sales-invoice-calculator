const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(ico|png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: 'web/[path][name].[ext]'
                    },
                  },
                ],
            },
        ]
    },
};

module.exports = config;
