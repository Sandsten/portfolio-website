const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
  target: 'web',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    historyApiFallback: true // 404 responses will fall back to index.html. Required for using react-router-dom
  },
  devtool: 'inline-source-map', // Remove this when in production, takes alot of space!
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      },
      {
        test: /\.scss$/,
        // Order of modules matters
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg|gif|pdf)$/,
        use: ['file-loader']
      },
      {
        //Load fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html'
    }),
    new ErrorOverlayPlugin()
  ]
};
