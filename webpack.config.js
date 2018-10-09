const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => {
    const isDevMode = options.mode === "development";
    return {
        devtool: isDevMode ? "source-map" : false,
        entry: './src/main.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                // loader:'babel-loader'
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevMode
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")()
                            ],
                            sourceMap: isDevMode
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevMode
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/"
                        }
                    }
                ]
            }
        ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'app/')
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            })
        ]
    }
};
