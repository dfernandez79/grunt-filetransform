'use strict';

var grunt = require('grunt');

function assertFileContents(options, test) {
    test.expect(1);

    var actual = grunt.file.read(options.actual);
    var expected = grunt.file.read(options.expected);
    test.equal(actual, expected, options.message);

    test.done();
}

exports.filetransform = {
  defaultOptions: function(test) {
    assertFileContents({
      actual: 'tmp/defaultOptions',
      expected: 'test/expected/defaultOptions',
      message: 'by default file contents remains intact and multiple files as concatenated'
    }, test);
  },

  customOptions: function(test) {
    assertFileContents({
      actual: 'tmp/customOptions',
      expected: 'test/expected/customOptions',
      message: 'the map/reduce of the task options should be applied'
    }, test);
  },

  passDestOptionToMap: function(test) {
    assertFileContents({
      actual: 'tmp/passDestOptionToMap',
      expected: 'test/expected/passDestOptionToMap',
      message: 'additional per dest file options should be passed to the map function'
    }, test);
  },

  passDestOptionToReduce: function(test) {
    assertFileContents({
      actual: 'tmp/passDestOptionToReduce',
      expected: 'test/expected/passDestOptionToReduce',
      message: 'additional per dest file options should be passed to the reduce function'
    }, test);
  },

  mergeDefault: function(test) {
    assertFileContents({
      actual: 'tmp/mergeDefault',
      expected: 'test/expected/mergeDefault',
      message: 'task options should be used as defaults for the file options'
    }, test);
  },

  mergeOverwrite: function(test) {
    assertFileContents({
      actual: 'tmp/mergeOverwrite',
      expected: 'test/expected/mergeOverwrite',
      message: 'default file options could be ovewritten'
    }, test);
  },   
};
