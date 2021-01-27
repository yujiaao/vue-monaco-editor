var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/main.js',   
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  externals: {
    /* vue: 'vue', */
    clipboard: 'clipboard'
  },
  module: {
    rules: [
      {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      },
      {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader']
      },
      {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
              limit: 10000,
              name: 'img/[name].[ext]'
          }
      },
      {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
              limit: 10000,
              name: 'fonts/[name].[ext]'
          }
      },
      {
          test: /\.vue$/,
          use: [{
              loader: 'vue-loader'
          }]
      }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '首页',  //生成的页面标题<head><title>首页</title></head>
      filename: 'index.html', // dist目录下生成的文件名
      template: './index.html' // 我们原来的index.html，作为模板
    }),
    new VueLoaderPlugin()
  ],
  performance: {
    hints: false
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    noInfo: true,

    contentBase: path.join(__dirname, 'dist'), // html所在路径
    compress: true, // 是否压缩
    port: 3000, // 端口
    hot: true, // 热部署
    open: true // 打包完成后自动打开网页
  }
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'eval-source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new CopyWebpackPlugin({
      patterns: [{
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs',
      }]
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
