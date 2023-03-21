import path from 'path';
import PATHS from './paths.js';
import { VueLoaderPlugin } from 'vue-loader';

export default {
    mode: 'production',
    experiments: {
        outputModule: true,
    },
    entry: {
        esm: {
            import: PATHS.INPUT,
            library: {
                type: 'module',
            },
        },
        umd: {
            import: PATHS.INPUT,
            library: {
                name: 'ShardVue3',
                type: 'var'
            },
        },
        common: {
            import: PATHS.INPUT,
            library: {
                type: 'commonjs2'
            },
        },
    },
    output: {
        path: PATHS.DIST,
        filename: 'shards-vue3.[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                resolve: {
                    fullySpecified: false,
                }
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'css-loader', 'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};
