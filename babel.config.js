const project = require('./package.json');

// eslint-disable-next-line no-underscore-dangle
const parseAlias = () => Object.entries(project._moduleAliases)
  .reduce((accu, [key, value]) => ({
    ...accu,
    [key]: value.replace('build', './src'),
  }), {});

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['module-resolver', {
      root: ['./src'],
      extensions: ['.ts', '.tsx'],
      alias: parseAlias(),
    }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
};
