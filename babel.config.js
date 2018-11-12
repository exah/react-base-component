const IS_TEST = process.env.NODE_ENV === 'test'
const IS_ESM = !IS_TEST && process.env.MODULES !== 'cjs'

module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: IS_ESM ? false : 'commonjs',
        loose: true
      }
    ]
  ],
  plugins: [
    [ '@babel/plugin-transform-runtime', { useESModules: IS_ESM } ],
    [ '@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true, loose: true } ]
  ]
}
