const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Cleans the output directory before emitting files
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      url: require.resolve('url/'),
      assert: require.resolve('assert/'),
      zlib: require.resolve('browserify-zlib'),
      fs: false, // Set to false as it's not typically used in the browser
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Add support for CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Add support for image files
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body', // Ensures the script is injected at the end of the body
    }),
    new NodePolyfillPlugin(),
    // Other plugins...
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true, // Automatically opens the browser
    hot: true, // Enables Hot Module Replacement
    historyApiFallback: true, // Fallback to index.html for SPA
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // Optimize chunk splitting
    },
  },
};
