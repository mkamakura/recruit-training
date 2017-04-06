const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('./precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const rootDir = path.resolve(__dirname, '../..');
const port = +(process.env.PORT || 3000);
const outputPath = path.resolve(rootDir, 'build/client');
const outputPublicPath = '/public/';

module.exports = {
  target: 'web',

  devtool: 'inline-source-map',

  context: rootDir,

  entry: {
    client: [
      path.resolve(rootDir, 'src/client/index.js'),
    ],
  },

  output: {
    path: outputPath,
    filename: '[name].js',
    publicPath: outputPublicPath,
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(rootDir, 'src/client'),
          path.resolve(rootDir, 'src/shared'),
        ],
        exclude: [
          /node_modules/,
        ],
        loader: 'babel',
        query: {
          presets: [
            'react',
            'es2015',
          ],
          plugins: [
            'syntax-trailing-function-commas',
            'transform-object-rest-spread',
            ['react-transform',
              {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module'],
                  },
                  {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react'],
                  },
                ],
              },
            ],
          ],
        },
      },
      {
        test: /\.scss/,
        loaders: [
          'style',
          'css?' + JSON.stringify({
            modules: true,
            importLoaders: 1,
            localIdentName: '[path]__[name]__[local]___[hash:base64:5]',
          }),
          'postcss',
          'stylefmt',
        ],
      },
    ],
  },

  postcss: function (webpack) {
    return [
      precss({
        addDependencyTo: webpack,
        import: { addDependencyTo: webpack },
      }),
      autoprefixer,
    ];
  },

  resolve: {
    root: [
      path.resolve(rootDir, 'src/client'),
      path.resolve(rootDir, 'src/shared'),
    ],
    extensions: ['', '.js', '.jsx'],
    packageAlias: 'browser',
  },

  plugins: [
    new StyleLintPlugin({
      files: ['**/*.scss'],
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, 'src/template.html'),
      filename: path.resolve(outputPath, 'index.html'),
    }),
  ],

  devServer: {
    contentBase: outputPath,
    historyApiFallBack: true,
    port,

    noInfo: true,
  },
};
