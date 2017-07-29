const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const createEnvVarArray = () => {
    const o = { [`process.env.VERSION`]: `"dev"` };
    ['NODE_ENV', 'BASE_PATH', 'ROOT_URL']
        .filter(name => name in process.env)
        .forEach(name => (o[`process.env.${name}`] = `"${process.env[name]}"`));

    return o;
};

module.exports = {
    entry: {
        app: ['./src/index.js', './src/index.html'],

        // vendors in another chunk to minimize the files size ( too large and it's a pain to open in debugger s)
        // vendor: ['react-dom', 'react', 'redux', 'react-redux'],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },

            {
                test: /\.html?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].html',
                        },
                    },
                ],
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: true,
                            localIdentName: '[path][name]---[local]',
                        },
                    },
                ],
            },

            {
                test: /\.(eot|ttf|woff|otf|woff2|svg|gif|jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:6].[ext]',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new webpack.NamedModulesPlugin(),

        new webpack.DefinePlugin(createEnvVarArray()),
    ],

    devtool: 'source-map',

    devServer: {
        port: 8082,
        watchOptions: {
            ignored: /node_modules/,
        },
    },
};
