module.exports = function(wallaby) {
  return {
    files: ['lib/**/*.js', { pattern: 'lib/**/*.test.js', ignore: true }],
    tests: ['lib/**/*.test.js'],
    compilers: {
      'lib/**/*.js': wallaby.compilers.babel({
        presets: ['@babel/preset-env'],
        plugins: [
          '@babel/plugin-transform-runtime',
          '@babel/plugin-syntax-object-rest-spread',
          '@babel/plugin-proposal-class-properties'
        ]
      })
    },
    env: {
      type: 'node'
    },
    testFramework: 'jest',
    debug: true
  };
};
