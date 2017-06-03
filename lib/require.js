const fs = require('fs');
const path = require('path');

/**
 * The cache for storing hot module
 * @name {Object} hotModuleCache
 */
let hotModuleCache = {};

/**
 * Thanks to:
 * https://github.com/sindresorhus/callsites/blob/master/index.js
 * 
 * Parse module path
 * @param {String} filePath 
 * @param {String} 
 */
function parseFileFullPath( filePath ) {
  const _ = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;
	const stack = new Error().stack.slice(1);
	Error.prepareStackTrace = _;
  const currentFilePath = stack[1].getFileName();
	return require.resolve(path.dirname(currentFilePath) + '/' + filePath);
}


/**
 * Thanks to:
 * https://github.com/rayosu/hot-require/blob/master/hot-require.js
 * 
 * Clone Module deeply to proxy cache
 * @param {Object|Function} target 
 * @param {Object|Function} source 
 */
function cloneModule(target, source) {
  for (let propKey in source) {
    let propEntity = source[propKey];
    if ( typeof propEntity === 'function' ) {
      target[propKey] = function() {
        return function() {
          return source[propKey].apply(source, arguments);
        }
      }(propKey);
    } else {
      Object.defineProperty(target, propKey, {
        enumerable: true,
        configurable: true,
        get: function(propKey) {
          return function() {
            return source[propKey];
          }
        }(propKey),
        set: function(propKey) {
          return function(value) {
            source[propKey] = value;
          }
        }(propKey)
      })
    }
  }

  if ( target.prototype && source.prototype ) {
    cloneModule(target.prototype, source.prototype);
  }
}


/**
 * @name {Function} clean the require cache by moduleId
 * @param {String} moduleId 
 */
function cleanModule(moduleId) {
  let module = require.cache[moduleId]; 
  if (module.parent) {
      module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[moduleId] = null;
}


/**
 * @name {Function} $require 
 */
const $require = function( modulePath ) {
  let moduleId = parseFileFullPath(modulePath);
  if ( hotModuleCache[moduleId] ) {
    return hotModuleCache[moduleId];
  }

  let moduleEntity = {};
  let moduleCache = {};
  try {
    moduleEntity = require(moduleId);
  } catch ( err ) {
    console.log(err);
  }

  if ( typeof moduleEntity === 'function' ) {
    moduleCache = function() {
      let moduleObj = new moduleEntity(arguments);
      cloneModule(this, moduleObj);
    };
  } 

  cloneModule(moduleCache, moduleEntity);

  fs.watchFile(moduleId, () => {
    cleanModule(moduleId);
    
    try {
      moduleEntity = require(moduleId);
    } catch ( err ) {
      console.log(err);
    }

    if ( typeof moduleEntity === 'function' ) {
      moduleCache = function() {
        let moduleObj = new moduleEntity(arguments);
        cloneModule(this, moduleObj);
      };
    } 
    cloneModule(moduleCache, moduleEntity);
  })

  hotModuleCache[moduleId] = moduleCache;

  return moduleCache;
}


// /**
//  * init global prop
//  */
// global.$require = $require;

module.exports = $require;