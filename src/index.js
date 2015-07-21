'use strict';

var _ = require('lodash');

function loadTasks(mode, options, gulp, tasks) {

  var defaultTaskOptionsFromLoader = {
    enabled: true,
    dependencies: []
  };
  options = options || {};

  _.forEach(tasks, function(entry, taskName) {

    var compiledOptions;
    var zkTask;
    var taskOptionsFromLoader;

    if (_.isFunction(entry.getTask)) {

      zkTask = entry;
      taskOptionsFromLoader = defaultTaskOptionsFromLoader;

    } else {

      zkTask = entry.task;
      taskOptionsFromLoader = _.defaults(entry, defaultTaskOptionsFromLoader);
      delete taskOptionsFromLoader.task;

      if (typeof taskOptionsFromLoader.mode !== undefined) {
        _.extend(mode, taskOptionsFromLoader.mode);
        delete taskOptionsFromLoader.mode;
      }

    }

    compiledOptions = _.defaults(
      options[taskName] || {},
      taskOptionsFromLoader,
      zkTask.defaultOptions
    );

    if (compiledOptions.enabled === false) return;

    gulp.task(taskName, compiledOptions.dependencies, zkTask.getTask(compiledOptions, gulp, mode));

  });

}

module.exports = loadTasks;
