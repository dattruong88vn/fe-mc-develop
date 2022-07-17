// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const portFinderSync = require('portfinder-sync');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'public/index.html'
  })
];

console.log(resolve(__dirname, './src/'));

// config webpack
const config = {
  mode: 'development',
  // devtool: 'source-map',
  entry: './src/index.tsx',
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    liveReload: true,
    port: portFinderSync.getPort(3301),
    static: {
      directory: resolve(__dirname, 'public'),
      publicPath: '/',
      watch: true
    },
    allowedHosts: 'all'
  },
  target: 'web',
  output: {
    filename: 'index.bundle.js',
    path: resolve(__dirname, './build')
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
  performance: {
    hints: false
  }
};
module.exports = config;
