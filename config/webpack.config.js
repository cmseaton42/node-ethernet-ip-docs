const webpack = require("webpack");
const path = require("path");
const marked = require("marked");
const highlight = require("highlight");

module.exports = {
    entry: ["react-hot-loader/patch", "./src/index.js"],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.docthat$/,
                use: [
                    {
                        loader: path.resolve(__dirname, "./loaders/doc-loader.js")
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase: "./dist",
        hot: true,
        overlay: true
    }
};
