import webpack from 'webpack';
import path from 'path';

// postcss plugins

const config = {
  entry: {
    DevToolbar: [
      'babel-polyfill',
      './src/DevToolbar.jsx',
    ],
    index: [
      'babel-polyfill',
      './src/index.js',
    ],
    middleware: [
      'babel-polyfill',
      './src/expressMiddleware.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  externals: [
    'fs', 'path', 'chalk', 'on-headers', 'on-finished', 'socket.io',
  ],
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        exclude: /(node_modules|bower_components|dist)/,
      },
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.p?css$/,
        loader: 'style-loader!' +
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!' +
        'postcss-loader?sourceMap=inline',
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};

export default config;
