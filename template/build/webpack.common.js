const path = require('path');
// 生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清空dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';


module.exports = {
  entry: {
    index: './src/views/home/index.js',
    about: './src/views/about/about.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist')
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-simple',
      template: 'src/views/home/index.pug',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'webpack-simple',
      template: 'src/views/about/about.pug',
      filename: 'about.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.pug$/,
        include: path.join(__dirname, '..', 'src'),
        loaders: [ 'pug-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};