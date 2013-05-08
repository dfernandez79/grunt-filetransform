/*
 * grunt-filetransform
 * https://github.com/dfernandez79/grunt-filetransform
 *
 * Copyright (c) 2013 Diego Fernandez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  function extistingFiles(filepath) {
    return grunt.file.isFile(filepath);
  }

  function nullTransform(contents) {
    return contents;
  }

  function concatenate(results) {
    return results.map(function (f) { return f.contents; }).join('');
  }

  grunt.registerMultiTask('filetransform', 'Applies custom functions to transform and concatenate files.', function() {
    
    var _ = grunt.util._,

        // Merge task-specific and/or target-specific options with these defaults.
        options = this.options({ map: nullTransform, reduce: concatenate }),

        // Setup the default options for each file
        defaultFileOptions = _.omit(options, 'map', 'reduce');

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var fileOptions = _.defaults(f, defaultFileOptions),

          result = options.reduce(
            f.src.filter(extistingFiles).map(function(filepath) {
              return {filepath: filepath, contents: options.map(grunt.file.read(filepath), filepath, fileOptions) };
          }), fileOptions);

      // Write the destination file.
      grunt.file.write(f.dest, result);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
