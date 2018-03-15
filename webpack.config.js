const webpack = require("webpack");
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
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            renderer: new marked.Renderer(),
                            gfm: true,
                            tables: true,
                            breaks: false,
                            pedantic: false,
                            sanitize: false,
                            smartLists: true,
                            smartypants: false,
                            highlight: function(code) {
                                return highlight.highlightAuto(code).value;
                            }
                        }
                    }
                ]
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
        hot: true
    }
};
