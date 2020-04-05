/**
 * Responsibility:
 * contains functions for the inject() command
 */
const fs = require("fs")
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
/**
 * returns true if injection code is already present
 * @param {String[]} codeArray array of lines of code from target file
 * @param {String} injection code to be injected
 */
const checkForDuplicateCode = function (
    codeArray,
    injection
) {
    // does payload.injection already exists?
    // loop through codeArray and find out...
    let codeString = ""
    codeArray.forEach((line) => {
        for (const char of line) {
            if (char !== " ") {
                codeString += char
            }
        }
    })
    const injectionArray = injection.split("\n")
    let injectionString = ""
    injectionArray.forEach((line) => {
        for (const char of line) {
            if (char !== " ") {
                injectionString += char
            }
        }
    })
    let canInject = codeString.includes(injectionString) ? false : true
    return canInject
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
/**
 * writes the updated code in target file
 * @param {String} targetFilePath path to the target file
 * @param {String[]} codeArray array of lines of code from target file
 */
const saveUpdatedCode = function (targetFilePath, codeArray) {
    let codeString = ""
    codeString = codeArray.join("\n")
    fs.writeFile(targetFilePath, codeString, (error) => {
        error === null
            ? console.log("code injections successful")
            : console.log(err)
    })
    codeString = ""
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
/**
 * gets the index in codeArray where code will be injected
 * @param {String[]} codeArray array of lines of code from target file
 * @param {String} line a line of code in codeArray
 * @param {Boolean} injectAbove inject code above or below?
 */
const getInsertIndex = function (codeArray, line, injectAbove = false) {
    // insertIndex stores the index for adding code injection
    let insertIndex = -1
    if (injectAbove) {
        // inject code snippet above search pattern code line
        insertIndex = codeArray.indexOf(line)
    } else {
        // inject code snippet below search pattern code line
        insertIndex = codeArray.indexOf(line) + 1
    }
    return insertIndex
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
/**
 * gets the tabString
 * @param {String} line a line of code in codeArray
 * @param {Number} numOfTabs how many tabs to prefix?
 */
const getTabString = function (line, numOfTabs) {
    let tabString = ""

    // create tabString
    for (let index = 0; index < line.length; index++) {
        if (line.charCodeAt(index) == 32) {
            tabString += " "
        } else {
            break
        }
    }
    // add payload's tabs to tabString
    for (let index = 0; index < numOfTabs; index++) {
        tabString += " "
    }

    return tabString
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
/**
 * gets the tabbedInjection
 * @param {String} injection code to be injected
 * @param {String} tabString string with tabs
 */
const getTabbedInjection = function (injection, tabString) {
    let tabbedInjection = ""

    // prefix tabs with each line in payload.injection
    let injectionArray = injection.split("\n")
    let paddedInjectionArray = injectionArray.map((injection) => {
        return tabString + injection
    })

    // convert paddedInjectionArray into string
    tabbedInjection = paddedInjectionArray.join("\n")

    return tabbedInjection
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
module.exports = {
    checkForDuplicateCode,
    saveUpdatedCode,
    getInsertIndex,
    getTabString,
    getTabbedInjection,
}
