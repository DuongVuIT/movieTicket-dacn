module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@type': './src/type',
          '@api': './src/api',
          '@redux': './src/redux',
          '@i18n': './src/i18n',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
};
