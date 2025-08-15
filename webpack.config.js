import { VueLoaderPlugin } from 'vue-loader';
import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import packageJSON from './package.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { dependencies } = packageJSON;

const PATHS = {}
PATHS.SRC = path.resolve(__dirname, 'src');
PATHS.DIST = path.resolve(__dirname, 'dist');
PATHS.INPUT = path.resolve(PATHS.SRC, 'index.js');

const externals = Object.keys(dependencies).filter(dep => {
    return ['popper.js', 'lodash.xor'].indexOf(dep) === -1
});

export default {
    mode: 'production',
    devtool: 'source-map',
    experiments: {
        outputModule: true,
    },
    entry: {
        'esm.min': {
            import: PATHS.INPUT,
            library: {
                type: 'module',
            },
        },
        'umd.min': {
            import: PATHS.INPUT,
            library: {
                name: 'ShardVue3',
                type: 'var'
            },
        },
        'common.min': {
            import: PATHS.INPUT,
            library: {
                type: 'commonjs2'
            },
        }
    },
    output: {
        path: PATHS.DIST,
        filename: 'shards-vue3.[name].js',
        clean: true
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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    externals
};
