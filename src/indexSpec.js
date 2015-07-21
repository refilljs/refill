'use strict';

var loadTasks = require('./');

describe('index loadTasks', function() {

  var zkTaskRoadkillMock;
  var roadkillTask;
  var gulpMock;
  var mode;
  var options;
  var taskName;

  beforeEach(function() {
    taskName = 'roadkill';
    zkTaskRoadkillMock = jasmine.createSpyObj('zkTaskRoadkillMock', ['getTask']);
    roadkillTask = jasmine.createSpy('roadkillTask');
    gulpMock = jasmine.createSpyObj('gulpMock', ['task']);
    mode = {
      env: 'dev'
    };
    options = {};
    zkTaskRoadkillMock.getTask.and.returnValue(roadkillTask);
  });

  describe('when zkTask is passed directly', function() {

    function loadTestTasks() {
      loadTasks(mode, options, gulpMock, {
        roadkill: zkTaskRoadkillMock
      });
    }

    it('should add task to gulp', function() {
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
        enabled: true,
        dependencies: []
      }, gulpMock, mode);
    });

    it('and enabled is overwritten in options should NOT add task to gulp', function() {
      options[taskName] = {
        enabled: false,
        dependencies: []
      };
      loadTestTasks();
      expect(gulpMock.task).not.toHaveBeenCalled();
      expect(zkTaskRoadkillMock.getTask).not.toHaveBeenCalledWith();
    });

  });

  describe('when zkTask is passed in object', function() {

    function loadTestTasks() {
      loadTasks(mode, options, gulpMock, {
        roadkill: {
          task: zkTaskRoadkillMock
        }
      });
    }

    it('should add task to gulp', function() {
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
        enabled: true,
        dependencies: []
      }, gulpMock, mode);
    });

    it('and enabled is overwritten in options should NOT add task to gulp', function() {
      options[taskName] = {
        enabled: false,
        dependencies: []
      };
      loadTestTasks();
      expect(gulpMock.task).not.toHaveBeenCalled();
      expect(zkTaskRoadkillMock.getTask).not.toHaveBeenCalled();
    });

  });

  describe('when zkTask is passed in object', function() {

    var forceMode;

    function loadTestTasks() {
      loadTasks(mode, options, gulpMock, {
        roadkill: {
          task: zkTaskRoadkillMock,
          mode: forceMode
        }
      });
    }

    it('and new mode is set should add this mode to current modes', function() {
      forceMode = {
        watch: true
      };
      loadTestTasks();
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
        enabled: true,
        dependencies: []
      }, gulpMock, {
        env: 'dev',
        watch: true
      });
    });

    it('and new mode is set should add this mode to current modes', function() {
      forceMode = {
        env: 'prod'
      };
      loadTestTasks();
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
        enabled: true,
        dependencies: []
      }, gulpMock, {
        env: 'prod'
      });
    });

    afterEach(function() {
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
    });

  });

  describe('when zkTask is passed in object with enabled set to false', function() {

    function loadTestTasks() {
      loadTasks(mode, options, gulpMock, {
        roadkill: {
          task: zkTaskRoadkillMock,
          enabled: false
        }
      });
    }

    it('should NOT add task to gulp', function() {
      loadTestTasks();
      expect(gulpMock.task).not.toHaveBeenCalled();
      expect(zkTaskRoadkillMock.getTask).not.toHaveBeenCalledWith();
    });

    it('and enabled is overwritten in options should add task to gulp', function() {
      options[taskName] = {
        enabled: true,
        dependencies: []
      };
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
        enabled: true,
        dependencies: []
      }, gulpMock, mode);
    });

  });

  describe('when zkTask is passed in object with dependencies set', function() {

    var dependencies;

    function loadTestTasks() {
      loadTasks(mode, options, gulpMock, {
        roadkill: {
          task: zkTaskRoadkillMock,
          dependencies: dependencies
        }
      });
    }

    beforeEach(function() {
      dependencies = ['first', 'second'];
    });

    it('should add task to gulp with this dependencies', function() {
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, dependencies, roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
          enabled: true,
          dependencies: dependencies
        },
        gulpMock,
        mode
      );
    });

    it('and dependencies are overwritten in options should add task to gulp with this dependencies', function() {
      options[taskName] = {
        dependencies: ['third']
      };
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, options[taskName].dependencies, roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
          enabled: true,
          dependencies: options[taskName].dependencies
        },
        gulpMock,
        mode
      );
    });

  });

  describe('when zkTask is passed with additional option', function() {

    var additionalOption;

    function loadTestTasks() {
      loadTasks(mode, options, gulpMock, {
        roadkill: {
          task: zkTaskRoadkillMock,
          additionalOption: additionalOption
        }
      });
    }

    beforeEach(function() {
      additionalOption = 'someValue';
    });

    it('should call task with this option', function() {
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
          enabled: true,
          dependencies: [],
          additionalOption: additionalOption
        },
        gulpMock,
        mode
      );
    });

    it('and additional option is overwritten in options should add task to gulp with overwritten option', function() {
      options[taskName] = {
        additionalOption: 'overwrittenValue'
      };
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, options[taskName].dependencies, roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
          enabled: true,
          dependencies: [],
          additionalOption: options[taskName].additionalOption
        },
        gulpMock,
        mode
      );
    });

  });

  describe('when zkTask has some default option', function() {

    var defaultOption;
    var loadTaskOptions;

    function loadTestTasks() {
      loadTasks(mode, options, gulpMock, {
        roadkill: loadTaskOptions
      });
    }

    beforeEach(function() {
      defaultOption = 'defaultValue';
      zkTaskRoadkillMock.defaultOptions = {
        defaultOption: defaultOption
      };
      loadTaskOptions = {
        task: zkTaskRoadkillMock
      };
    });

    it('should call task with this option', function() {
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
          enabled: true,
          dependencies: [],
          defaultOption: defaultOption
        },
        gulpMock,
        mode
      );
    });

    it('and default option is overwritten in options should add task to gulp with overwritten option', function() {
      options[taskName] = {
        defaultOption: 'value overwritten by options'
      };
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
          enabled: true,
          dependencies: [],
          defaultOption: options[taskName].defaultOption
        },
        gulpMock,
        mode
      );
    });

    describe('and default option is overwritten in task options ', function() {

      beforeEach(function() {
        loadTaskOptions.defaultOption = 'value overwritten by load tasks options';
      });

      it('should add task to gulp with overwritten option', function() {
        loadTestTasks();
        expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
        expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
            enabled: true,
            dependencies: [],
            defaultOption: loadTaskOptions.defaultOption
          },
          gulpMock,
          mode
        );
      });

      it('and default option is overwritten in options should add task to gulp with overwritten option', function() {
        options[taskName] = {
          defaultOption: 'value overwritten by options'
        };
        loadTestTasks();
        expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
        expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
            enabled: true,
            dependencies: [],
            defaultOption: options[taskName].defaultOption
          },
          gulpMock,
          mode
        );
      });

    });

  });

});
