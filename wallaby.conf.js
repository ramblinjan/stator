module.exports = function (wallaby) {
  return {
    files: [
      'lib/**/*.js',
      { pattern: 'lib/**/*.test.js', ignore: true }
    ],
    tests: [
      'lib/**/*.test.js'
    ],
    env: {
      type: 'node'
    },
    compilers: {
      'lib/**/*.js': wallaby.compilers.babel({
        presets: ['env']
      })
    },
    testFramework: 'jest',
    debug: true
  };
};