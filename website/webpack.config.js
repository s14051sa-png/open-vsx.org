/********************************************************************************
 * Copyright (c) 2020 TypeFox and others
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0
 ********************************************************************************/

const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const outputPath = path.resolve(__dirname, 'static');
const reportPath = path.resolve(__dirname, 'dev', 'static', 'report-prod.html');

module.exports = {
    entry: [
        './src/main.tsx'
    ],
    output: {
        filename: 'bundle.js',
        path: outputPath,
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            [
                                'babel-plugin-import',
                                {
                                    'libraryName': '@material-ui/core',
                                    'libraryDirectory': 'esm',
                                    'camel2DashComponentName': false
                                },
                                'core'
                            ],
                            [
                                'babel-plugin-import',
                                {
                                    'libraryName': '@material-ui/icons',
                                    'libraryDirectory': 'esm',
                                    'camel2DashComponentName': false
                                },
                                'icons'
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /\.useable\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    node: { fs: 'empty', net: 'empty' },
    devtool: 'source-map',

    plugins: [
        new webpack.WatchIgnorePlugin([
            /\.js$/,
            /\.d\.ts$/
        ]),
        new webpack.ProgressPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: reportPath
        })
    ]
};
