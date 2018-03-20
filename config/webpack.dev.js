const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
    entry: {
        bundle: "./src/index.js"
    },
    mode: "development",
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].[hash:8].js"
    },
    module: {
        rules: [
            {
                use: "babel-loader",
                test: /\.js$/,
                exclude: [/\.docthat$/, /node_modules/]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: "url-loader",
                options: {
                    limit: 25000
                }
            },
            {
                use: "json-loader",
                test: /\.json$/
            },
            {
                test: /\.docthat$/,
                use: [
                    {
                        loader: path.resolve(__dirname, "./loaders/doc-loader")
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: "postcss",
                            plugins: () => [
                                require("postcss-flexbugs-fixes"),
                                autoprefixer({
                                    browsers: [
                                        ">1%",
                                        "last 4 versions",
                                        "Firefox ESR",
                                        "not ie < 9" // React doesn't support IE8 anyway
                                    ],
                                    flexbox: "no-2009"
                                })
                            ]
                        }
                    }
                ]
            },
            {
                exclude: [
                    /\.(js|jsx|mjs)$/,
                    /\.html$/,
                    /\.scss$/,
                    /\.json$/,
                    /\.docthat$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/
                ],
                loader: "file-loader",
                options: {
                    name: "static/media/[name].[hash:8].[ext]"
                }
            }
        ]
    },
    devServer: {
        contentBase: "dist",
        overlay: true,
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};
