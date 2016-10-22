const path = require('path');
const webpack = require('webpack');
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import DotenvPlugin from 'webpack-dotenv-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

process.env.BABEL_ENV = 'production';

export default {
    devtool: 'source-map',
    noInfo: false,
    entry: './react_src/index',
    target: 'web',
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new DotenvPlugin({
            sample: './.env.default',
            path: './.env'
        })

    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'react_src'), loaders: ['babel'], exclude: /node_modules/},
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
            },
            {
                test: /(\.css)$/,
                exclude: /react_src/,
                loader: ExtractTextPlugin.extract("css?sourceMap")
            },
            {test: /\.json$/, loader: "json-loader"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};
