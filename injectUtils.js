/**
 * Responsibility:
 * contains functions for the inject() command
 */

 
/**
 * returns true if injection code is already present
 * @param {String[]} codeArray array of lines of code from target file
 * @param {String} injection code to be injected 
 * @param {Boolean} allowDuplicates is duplicate code allowed?
 */
const checkForDuplicateCode = function (codeArray, injection, allowDuplicates=false) {
    // does payload.injection already exists?
    // loop through codeArray and find out...
    let canInject = true
    codeArray.forEach((line) => {
        if (line.includes(injection) && !allowDuplicates) {
            canInject = false
            return
        }
    })
    return canInject
}

module.exports = { 
    checkForDuplicateCode
}
