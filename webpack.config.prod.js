// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'public/index.html'
  })
];

console.log(resolve(__dirname, './src/'));

// config webpack
const config = {
  mode: 'production',
  entry: resolve(__dirname, './src/index.tsx'),
  target: 'web',
  output: {
    path: resolve(__dirname, './build'),
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin({})]
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    cacheDirectory: resolve(__dirname, '.temp_cache'),
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename]
      // By default webpack and loaders are build dependencies
    }
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp3)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: plugins,
  optimization: {
    chunkIds: 'named',
    concatenateModules: false,
    emitOnErrors: true,
    flagIncludedChunks: true,
    innerGraph: true, //tells webpack whether to conduct inner graph analysis for unused exports.
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: true,
    nodeEnv: 'production',
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: true,
          keep_classnames: true,
          keep_fnames: false,
          sourceMap: false,
          safari10: true,
          parse: {
            html5_comments: false
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
  },
  performance: {
    hints: 'warning'
  }
};
module.exports = config;
