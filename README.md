# Refill

Loader for reusable gulp tasks

[<img alt="Made by Zaklinacze Kodu" src="http://zaklinaczekodu.com/_assets/madeBy.svg" width="200">](http://zaklinaczekodu.com)

[Facebook](https://www.facebook.com/zaklinaczekodu)

Shields
-------

[![npm](https://img.shields.io/npm/v/refill.svg?style=flat-square)](https://www.npmjs.com/package/refill)
[![npm](https://img.shields.io/npm/l/refill.svg?style=flat-square)](https://www.npmjs.com/package/refill)
[![npm](https://img.shields.io/npm/dm/refill.svg?style=flat-square)](https://www.npmjs.com/package/refill)
[![Travis](https://img.shields.io/travis/refilljs/refill/master.svg?style=flat-square)](https://travis-ci.org/refilljs/refill)<br>
[![bitHound Overall Score](https://www.bithound.io/github/refilljs/refill/badges/score.svg)](https://www.bithound.io/github/refilljs/refill)
[![bitHound Dependencies](https://www.bithound.io/github/refilljs/refill/badges/dependencies.svg)](https://www.bithound.io/github/refilljs/refill/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/refilljs/refill/badges/devDependencies.svg)](https://www.bithound.io/github/refilljs/refill/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/refilljs/refill/badges/code.svg)](https://www.bithound.io/github/refilljs/refill)<br>
[![GitHub forks](https://img.shields.io/github/forks/refilljs/refill.svg?style=flat-square)](https://github.com/refilljs/refill)
[![GitHub stars](https://img.shields.io/github/stars/refilljs/refill.svg?style=flat-square)](https://github.com/refilljs/refill)
[![GitHub watchers](https://img.shields.io/github/watchers/refilljs/refill.svg?style=flat-square)](https://github.com/refilljs/refill)

Installation
------------

```bash
npm install --save refill gulp
```

Example
-------

Refill is used as a base for [Refill for Angular](https://github.com/refilljs/refill-angular)

API
---

```javaScript
require('refill')(tasksDefinitions, gulp, ...);
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
        options, // this object contains options computed from options passed to refill and task default options
        gulp,    // instance of gulp passed to refill
        ...)     // extra arguments passed to refill
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

and you pass to refill
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

Changelog
---------

[Changelog at github](https://github.com/refilljs/refill/releases)

Sponsors
--------

[<img alt="Zaklinacze Kodu" src="http://zaklinaczekodu.com/_assets/logo.svg" width="200">](http://zaklinaczekodu.com)