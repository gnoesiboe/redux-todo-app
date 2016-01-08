var webpack = require('webpack'),
    path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: {
        app: path.resolve(__dirname, 'src/js/app.js'),
        styles: path.resolve(__dirname, 'src/scss/styles.scss')
    },
    output: {
        filename: '[name].js',
        path: __dirname + "/build",
        hash: true
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'My App',
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html')
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
};
