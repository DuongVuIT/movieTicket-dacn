module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@screens': './src/screens',
          '@api': './src/api',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@assets': './src/assets',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
};
