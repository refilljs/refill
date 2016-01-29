'use strict';

var forEach = require('lodash.foreach');
var defaults = require('lodash.defaults');
var chalk = require('chalk');

function zkflow(options, gulp) {

  var defaultOptions = {
    enabled: true,
    dependencies: []
  };
  var args = Array.prototype.slice.call(arguments, 2);

  console.log('');
  console.log(' %s %s %s', chalk.green('◹'), chalk.green.bold('ZKflow'), chalk.grey('made by Zaklinacze Kodu'));
  console.log('');

  forEach(options, function(entry, taskName) {

    var compiledOptions;

    compiledOptions = defaults({}, entry, entry.task.defaultOptions, defaultOptions);

    if (compiledOptions.enabled === false) {
      return;
    }

    gulp.task(taskName, compiledOptions.dependencies, compiledOptions.task.getTask.apply(undefined, [compiledOptions, gulp].concat(args)));

  });

}

module.exports = zkflow;
