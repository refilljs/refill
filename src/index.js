'use strict';

var _ = require('lodash');

function loadTasks(options, gulp) {

  var defaultOptions = {
    enabled: true,
    dependencies: []
  };
  var args = Array.prototype.slice.call(arguments, 2);

  _.forEach(options, function(entry, taskName) {

    var compiledOptions;

    compiledOptions = _.defaults({}, entry, entry.task.defaultOptions, defaultOptions);

    if (compiledOptions.enabled === false) {
      return;
    }

    gulp.task(taskName, compiledOptions.dependencies, compiledOptions.task.getTask.apply(undefined, [compiledOptions, gulp].concat(args)));

  });

}

module.exports = loadTasks;
