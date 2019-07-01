# continue-compose
continue-compose composes continue functions, namely functions that may be passed as the `onFullfilled` parameter to `Promise.then()` 
to be executed serially and in an asynchronous fashion. Practically speaking, this is exactly how continue-compose will compose these 
functions, via Promise.then. 

## Basic Usage

```javascript
const Composer = require('continue-compose');
const fs = require('fs');

const action1 = function(x) {
  return x * 5;
}

const action2 = function(x) {
 return Promise.resolve(x+1);
}

const action3 = function(x) {
  return fs.Promises.writeFile('out.txt', x.toString());
}

const composer = new Composer(action1, action2, action3);
const result = composer.reduce(2); // result is a promise that when resolved will have written the value 11 to out.txt
```
