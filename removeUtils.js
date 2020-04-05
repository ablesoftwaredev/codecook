/**
 * Responsibility:
 * contains functions for remove() command
 */
const fs = require('fs')

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
/**
 * returns true if injection code is already present
 * @param {String[]} codeArray array of lines of code from target file
 * @param {String} codeToRemove code to be deleted
 */
const doesCodeToDeleteExist = function (
    codeArray,
    codeToRemove
) {
    // get codeString
    let codeString = ""
    codeArray.forEach(line => {
        for (const char of line) {
            if (char !== " ") {
                codeString += char
            }
        }
    });

    // get injectionString
    const codeToRemoveArray = codeToRemove.split('\n')
    let codeToRemoveString = ""
    codeToRemoveArray.forEach(line => {
        for (const char of line) {
            if (char !== " ") {
                codeToRemoveString += char
            }
        }
    });
    let canDelete = codeString.includes(codeToRemoveString) ? true : false
    return canDelete
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
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
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
module.exports = { 
    doesCodeToDeleteExist,
    saveUpdatedCode
}
