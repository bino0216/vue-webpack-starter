const path = require('path');

const VueLoaderPlugin   = require("vue-loader/lib/plugin");
const htmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const dist_path = __dirname + '/www';

// webpack.config.js
module.exports = {
    mode : 'development',
    watch: false,
    entry: {
      main : './src/main.js',
    },
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        '@': path.resolve('src')
      },
    },
    output: {
      path: dist_path
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.(sa|sc)ss$/,
            use: [
              'vue-style-loader',
              'css-loader',
              "postcss-loader",
              'sass-loader'
            ]
          },
          {
              test: /\.vue$/,
              loader: "vue-loader"
          },
          {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'file-loader',
            options: {
              name: 'files/[hash:10].[ext]'
            }
          }
        ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new htmlWebpackPlugin({
          template: path.join(__dirname, 'src/index.template.html'),
          inject: false,
          filename: path.join(dist_path, '/index.html'),
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
      }),
      new webpack.LoaderOptionsPlugin({
          options: {
              postcss: [
                  autoprefixer()
              ]
          }
      })
    ],
};
