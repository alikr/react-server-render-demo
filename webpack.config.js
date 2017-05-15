const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const filePath = path.join(__dirname, "public");
var config = [
    {
        name: "browser",
        entry: './client/index.js',
        output: {
            path: filePath,
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude:path.resolve(__dirname, 'node_modules/'),
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true
                    }
                }
            ]
        },
        plugins: [
            function(compiler) {
                this.plugin("done", function(stats) {
                    require("fs").writeFileSync(path.join(__dirname, "server", "stats.generated.json"), JSON.stringify(stats.toJson()));
                });
            }
        ]
    },
    {
        name: "server",
        entry: './server/server.js',
        target: "node",
        output: {
            path: filePath + "/assets",
            filename: "../../server/page.generated.js",
            publicPath: "../dist/",
            libraryTarget: "commonjs2"
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude:path.resolve(__dirname, 'node_modules/'),
                    loader: 'jsx-loader'
                }
            ]
        }
    },
]

module.exports = function(env) {

    return env == 'prod' ? (config[0] = webpackMerge(config[0], {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    drop_console: true,
                    drop_debugger: true,
                    dead_code: true
                },
                comments: false
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env)
            }),
        ]
    }), config) : config;
};