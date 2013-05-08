# grunt-filetransform

> Applies custom functions to transform and concatenate files.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filetransform --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filetransform');
```

## The "filetransform" task

### Overview
In your project's Gruntfile, add a section named `filetransform` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  filetransform: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.map
Type: `Function`
Default value: _identity transform_
Arguments passed to the fuction: `(contents, filepath, options)`
Returns: _the data of the transformed source_

This function will be invoked for each source file to transform:
* **contents**: the source file contents.
* **filepath**: the source file path.
* **options**: additional options that applies for the src/dest configuration.

#### options.reduce
Type: `Function`
Default value: _concatenate all file contents_
Argumenst passed to the function: `(results, options)`
Returns: _the data used to write the destination file_

This function is invoked with the results of each `options.map` call:
* **results**: is an array of objects with the following data: `{filepath: 'source path', contents: 'map result' }`.
* **options**: additional options that applies for the src/dest configuration.

### Usage Examples

#### Default Options
In this example, the default options are used. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing1 2 3.`

```js
grunt.initConfig({
  filetransform: {
    files: {
      'dest/defaultOptions': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  filetransform: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
