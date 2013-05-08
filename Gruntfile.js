/*
 * grunt-filetransform
 * https://github.com/dfernandez79/grunt-filetransform
 *
 * Copyright (c) 2013 Diego Fernandez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tests: ['tmp'],
    },

    filetransform: {
      defaultOptions: {
        files: {
          'tmp/defaultOptions': ['test/fixtures/testing', 'test/fixtures/123']
        },
      },

      customOptions: {
        options: {
          map: function (contents) { return '"' + contents + '"'; },
          reduce: function (results) { return results.map(function (f) { return f.contents; }).join(', '); }
        },
        files: {
          'tmp/customOptions': ['test/fixtures/testing', 'test/fixtures/123']
        }
      },

      passDestOptionToMap: {
        options: {
          map: function (contents, filepath, options) { return options.quote + contents + options.quote; }
        },
        files: [
          {dest: 'tmp/passDestOptionToMap', src: ['test/fixtures/testing', 'test/fixtures/123'], quote: '!'}
        ]
      },

      passDestOptionToReduce: {
        options: {
          reduce: function (results, options) { return results.map(function (f) { return f.contents; }).join(options.separator); }
        },
        files: [
          {dest: 'tmp/passDestOptionToReduce', src: ['test/fixtures/testing', 'test/fixtures/123'], separator: ','}
        ]
      },

      mergeTaskOptionWithFileOptions: {
        options: {
          map: function (contents, filepath, options) { return options.quote + contents + options.quote; },
          reduce: function (results, options) { return results.map(function (f) { return f.contents; }).join(options.separator); },
          separator: ',',
          quote: '"'  
        },
        files: [
          {dest: 'tmp/mergeDefault', src: ['test/fixtures/testing', 'test/fixtures/123']},
          {dest: 'tmp/mergeOverwrite', src: ['test/fixtures/testing', 'test/fixtures/123'], separator: ' '},
        ]
      }      
    },

    nodeunit: {
      tests: ['test/*Test.js'],
    },

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'filetransform', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
