# grunt-filetransform

> Applies custom functions to transform (map) and concatenate files (reduce).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt] before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filetransform --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filetransform');
```

## The "filetransform" task

### Overview

File transform does two things: 

1. It applies a `map` function to each file.
2. It takes the result of `map` functions and merges them with the `reduce` function.

It's a generic task that you can use to write file transformations without creating a [Grunt] plugin.


### Usage

In your project's Gruntfile, add a section named `filetransform` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  filetransform: {
    options: {
      // Task-specific options go here.
    },
    files: {
      // Files to transform following the Grunt file task configuration rules
      // you can also override task options for a group of files
    },
  },
})
```

The only task specific options are `map` and `reduce`:

```js
grunt.initConfig({
  filetransform: {
    options: {
        map: function (contents) { return '"' + contents + '"'; },
        reduce: function (results) { 
          return results.map(function (f) { return f.contents; }).join(', '); 
        }
    },
    files: {
        'example': ['file1', 'file2']
    },
  },
})
```

This example will quote the contents of `file1` and `file2` and them it will join them with a comma. 
Function arguments are specified bellow.

Any other options besides `map` and `reduce` are passed to your function. For instance the previous example 
can be re-written as:

```js
grunt.initConfig({
  filetransform: {
    options: {
        map: function (contents, filepath, options) { 
          return options.quote + contents + options.quote; 
        },
        reduce: function (results, options) { 
          return results.map(function (f) { return f.contents; }).join(options.separator); 
        },
        quote: '"',
        separator: ','
    },
    files: {
        'example': ['file1', 'file2']
    },
  },
})
```

The additional options used by your functions can be passed also for each file group, see this project 
[Gruntfile.js] for more examples.

### Options

#### options.map

* Type: `Function`
* Default value: _identity transform_
* Arguments passed to the fuction: `(contents, filepath, options)`
* Returns: _the data of the transformed source_

This function will be invoked for each source file to transform:
* **contents**: the source file contents.
* **filepath**: the source file path.
* **options**: additional options that applies for the src/dest configuration.

#### options.reduce

* Type: `Function`
* Default value: _concatenate all file contents_
* Argumenst passed to the function: `(results, options)`
* Returns: _the data used to write the destination file_

This function is invoked with the results of each `options.map` call:
* **results**: is an array of objects with the following data: `{filepath: 'source path', contents: 'map result' }`.
* **options**: additional options that applies for the src/dest configuration.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.0 - First release

[Grunt]: http://gruntjs.com/
[Gruntfile.js]: https://github.com/dfernandez79/grunt-filetransform/blob/master/Gruntfile.js
