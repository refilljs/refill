# ZKflow

Loader for reusable gulp tasks

Made by Zaklinacze Kodu

Shields
-------

[![npm](https://img.shields.io/npm/v/zkflow.svg?style=flat-square)](https://www.npmjs.com/package/zkflow)
[![npm](https://img.shields.io/npm/l/zkflow.svg?style=flat-square)](https://www.npmjs.com/package/zkflow)
[![npm](https://img.shields.io/npm/dm/zkflow.svg?style=flat-square)](https://www.npmjs.com/package/zkflow)<br>
[![Travis](https://img.shields.io/travis/zaklinaczekodu/zkflow/master.svg?style=flat-square)](https://travis-ci.org/zaklinaczekodu/zkflow)
[![Code Climate](https://img.shields.io/codeclimate/github/zaklinaczekodu/zkflow.svg?style=flat-square)](https://codeclimate.com/github/zaklinaczekodu/zkflow)<br>
[![David](https://img.shields.io/david/zaklinaczekodu/zkflow.svg?style=flat-square)](https://david-dm.org/zaklinaczekodu/zkflow)
[![David](https://img.shields.io/david/dev/zaklinaczekodu/zkflow.svg?style=flat-square)](https://david-dm.org/zaklinaczekodu/zkflow)<br>
[![GitHub forks](https://img.shields.io/github/forks/zaklinaczekodu/zkflow.svg?style=flat-square)](https://github.com/zaklinaczekodu/zkflow)
[![GitHub stars](https://img.shields.io/github/stars/zaklinaczekodu/zkflow.svg?style=flat-square)](https://github.com/zaklinaczekodu/zkflow)
[![GitHub followers](https://img.shields.io/github/followers/zaklinaczekodu.svg?style=flat-square)](https://github.com/zaklinaczekodu/zkflow)

Installation
------------

```bash
npm install --save zkflow gulp
```

Example
-------

ZKflow is used as a base for [ZKflow for Angular](https://github.com/zaklinaczekodu/gulp-zkflow-angular)

API
---

```javaScript
require('zkflow')(tasksDefinitions, gulp, ...);
```

### gulp

Gulp instance, usually `require('gulp')`.

### tasksDefinitions

Defining tasks

```javaScript
{
  taskName: {
    task: {
      getTask: function(
        options, // this object contains options computed from options passed to zkflow and task default options
        gulp,    // instance of gulp passed to zkflow
        ...)     // extra arguments passed to zkflow
        {
          return function() { // this function is actual gulp task function, which will be passed to gulp with given dependencies 
        }
      },
      defaultOptions: {
        option1: 'defaultValue',
        option3: 'totally different value'
      }
    },
    dependencies: ['task2', 'task3'],      // defaults to []
    enabled: true,                         // defaults to true
    option1: 'value',
    option2: 'other value'
  }
}
```

For every task options are merged only 1 level deep. Deeper they will be overwritten.

For example if you have default options
```JavaScript
{
  defaultOptions: {
      option1: 1
      option2: 2
      option3: {
          subOption1: 3
          subOption2: 4
      }
  }
}
```

and you pass to zkflow
```JavaScript
{
  someTask: {
      option1: 11
      option3: {
          subOption1: 5
      }
  }
}
```

actual options object in task is
```JavaScript
{
  someTask: {
      option1: 11
      option2: 2
      option3: {
          subOption1: 5
      }
  }
}
```

