'use strict';

var loadTasks = require('./');

describe('zkflow', function() {

  var zkTaskRoadkillMock;
  var roadkillTask;
  var gulpMock;
  var mode;
  var taskName;

  beforeEach(function() {
    taskName = 'roadkill';
    zkTaskRoadkillMock = jasmine.createSpyObj('zkTaskRoadkillMock', ['getTask']);
    roadkillTask = jasmine.createSpy('roadkillTask');
    gulpMock = jasmine.createSpyObj('gulpMock', ['task']);
    mode = {
      env: 'dev'
    };
    zkTaskRoadkillMock.getTask.and.returnValue(roadkillTask);
    spyOn(console, 'log');
  });

  describe('when zkTask is passed in object', function() {

    function loadTestTasks() {
      loadTasks({
        roadkill: {
          task: zkTaskRoadkillMock
        }
      }, gulpMock, mode);
    }

    it('should add task to gulp', function() {
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
        enabled: true,
        dependencies: [],
        task: zkTaskRoadkillMock
      }, gulpMock, mode);
    });

  });

  describe('when zkTask is passed in object with enabled set to false', function() {

    function loadTestTasks() {
      loadTasks({
        roadkill: {
          task: zkTaskRoadkillMock,
          enabled: false
        }
      }, gulpMock, mode);
    }

    it('should NOT add task to gulp', function() {
      loadTestTasks();
      expect(gulpMock.task).not.toHaveBeenCalled();
      expect(zkTaskRoadkillMock.getTask).not.toHaveBeenCalled();
    });

  });

  describe('when zkTask is passed in object with dependencies set', function() {

    var dependencies;

    function loadTestTasks() {
      loadTasks({
        roadkill: {
          task: zkTaskRoadkillMock,
          dependencies: dependencies
        }
      }, gulpMock, mode);
    }

    beforeEach(function() {
      dependencies = ['first', 'second'];
    });

    it('should add task to gulp with this dependencies', function() {
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, dependencies, roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
          task: zkTaskRoadkillMock,
          enabled: true,
          dependencies: dependencies
        },
        gulpMock,
        mode
      );
    });

  });

  describe('when zkTask is passed with additional option', function() {

    var additionalOption;

    function loadTestTasks() {
      loadTasks({
        roadkill: {
          task: zkTaskRoadkillMock,
          additionalOption: additionalOption
        }
      }, gulpMock, mode);
    }

    beforeEach(function() {
      additionalOption = 'someValue';
    });

    it('should call task with this option', function() {
      loadTestTasks();
      expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
      expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
          task: zkTaskRoadkillMock,
          enabled: true,
          dependencies: [],
          additionalOption: additionalOption
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
      loadTasks({
        roadkill: loadTaskOptions
      }, gulpMock, mode);
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
          task: zkTaskRoadkillMock,
          enabled: true,
          dependencies: [],
          defaultOption: defaultOption
        },
        gulpMock,
        mode
      );
    });

    describe('and default option is overwritten in task options ', function() {

      it('should add task to gulp with overwritten option', function() {
        loadTaskOptions.defaultOption = 'value overwritten by load tasks options';
        loadTestTasks();
        expect(gulpMock.task).toHaveBeenCalledWith(taskName, [], roadkillTask);
        expect(zkTaskRoadkillMock.getTask).toHaveBeenCalledWith({
            task: zkTaskRoadkillMock,
            enabled: true,
            dependencies: [],
            defaultOption: loadTaskOptions.defaultOption
          },
          gulpMock,
          mode
        );
      });

    });

  });

});
