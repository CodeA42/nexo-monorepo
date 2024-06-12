const path = require('path');

const { merge } = require('webpack-merge');
const { readFileSync } = require('fs');

// Nx plugins for webpack.
const { composePlugins, withNx } = require('@nx/webpack');

const swcConfig = JSON.parse(readFileSync(path.join(__dirname, '.swcrc')));

module.exports = composePlugins(withNx(), (config) => {
  const baseConfig = merge(config, {
    devtool: 'inline-source-map',
    optimization: {
      minimize: false,
    },
    entry: {},
    resolve: {
      extensions: ['.ts', ...config.resolve.extensions],
    },
    output: {
      path: path.resolve('dist/apps/transaction-watcher/'),
      libraryTarget: 'umd',
      filename: '[name].js',
    },
    stats: 'errors-warnings',
  });
  const withSwcLoader = merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'swc-loader',
            options: swcConfig,
          },
        },
      ],
    },
  });
  return withSwcLoader;
});
