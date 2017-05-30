
/**
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


global.$require = function( modulePath ) {
  let moduleId = parseFileFullPath(modulePath)
  return moduleId;
}