/**
 * Responsibility:
 * contains functions for remove() command
 */
const fs = require('fs')

/**
 * writes updated code in target file
 * @param {String} targetFilePath path to the target file
 * @param {String[]} codeArray array of lines of code from target file
 */
const saveUpdatedCode = function (targetFilePath, codeArray) {
    // make a string from the codeArray
    let codeString = ""
    codeString = codeArray.join("\n")
    // save the updated code in target file
    fs.writeFile(targetFilePath, codeString, (error) => {
        error === null
            ? console.log("code deletions successfull")
            : console.log(err)
    })
    codeString = ""
}

module.exports = { 
    saveUpdatedCode
}
