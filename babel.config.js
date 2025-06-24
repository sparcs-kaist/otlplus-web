module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-decorators', { version: '2023-11' }],
  ],
};
