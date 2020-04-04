/**
 * Responsibility:
 * contains functions for the inject() command
 */
const fs = require('fs')
 
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

/**
 * writes the updated code in target file
 * @param {String} targetFilePath path to the target file
 * @param {String[]} codeArray array of lines of code from target file
 */
const saveUpdatedCode = function(targetFilePath, codeArray) {
    let codeString = ""
    codeString = codeArray.join("\n")
    fs.writeFile(targetFilePath, codeString, error => {
        error === null
            ? console.log("code injections successfull")
            : console.log(err)
    })
    codeString = ""
}

module.exports = { 
    checkForDuplicateCode,
    saveUpdatedCode
}
