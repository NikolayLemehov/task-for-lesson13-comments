const webpack = require('webpack');
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin')

const prod = (config, _path) => {
    console.info("ENV: PROD");

    const uglify = [new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: false,
        }
    })];
    // config.plugins = config.plugins.concat(uglify);
    config.plugins = config.plugins.concat(new CleanWebpackPlugin(path.normalize(_path)));
    config.output.path =  path.normalize(_path);

    return config;
};

module.exports = prod;