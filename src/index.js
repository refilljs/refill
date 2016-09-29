'use strict';

var forEach = require('lodash.foreach');
var defaults = require('lodash.defaults');
var chalk = require('chalk');

function refill(options, gulp) {

  var defaultOptions = {
    enabled: true,
    dependencies: []
  };
  var args = Array.prototype.slice.call(arguments, 2);

  /* eslint-disable no-console */
  console.log('');
  console.log(' %s %s %s', chalk.green('◹'), chalk.green.bold('Refill'), chalk.grey('made by Zaklinacze Kodu'));
  console.log('');
  /* eslint-enable no-console */

  forEach(options, function(entry, taskName) {

    var compiledOptions;

    compiledOptions = defaults({}, entry, entry.task.defaultOptions, defaultOptions);

    if (compiledOptions.enabled === false) {
      return;
    }

    gulp.task(taskName, compiledOptions.dependencies, compiledOptions.task.getTask.apply(undefined, [compiledOptions, gulp].concat(args)));

  });

}

module.exports = refill;
