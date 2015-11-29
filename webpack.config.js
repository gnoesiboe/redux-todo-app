module.exports = {
    context: __dirname + "/src",
    entry: {
        javascript: "./js/app.js",
        html: "./index.html"
    },
    output: {
        filename: "app.js",
        path: __dirname + "/build",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"]
            },            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            }
        ]
    }
};
