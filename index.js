/**
 * Responsibility:
 * searches for pattern in specified code file and inserts specified code above / below it.
 * it then returns the modified code
 */
const fs = require("fs")
const path = require("path")
const injectUtils = require('./injectUtils')

/**
 * loops over the payloadArray and injects code snippets at specified patterns
 * @param {string} targetFilePath Path to codefile to be modified
 * @param {Array} payloadArray  objects array with search patterns & code injections
 **/
const inject = function(targetFilePath, payloadArray) {
    // open target file
    fs.readFile(targetFilePath, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            // read codefile's code in an array
            let code = data.toString()
            let codeArray = code.split("\n")

            // the index where search pattern was found
            let insertIndex = -1

            // string representation of tabs to insert
            let tabString = ""

            // code to be injected with tabs prefixed
            // this addes code with proper indentation
            let tabbedInjection = ""

            // loop through the payloadArray and perform all injections
            payloadArray.forEach(payload => {
                // does payload.injection already exists?
                // loop through codeArray and find out...
                let canInject = true
                canInject = injectUtils.checkForDuplicateCode(codeArray, payload.injection)
                if(canInject){
                    // loop through each line in codeArray and check if search pattern is found
                    codeArray.forEach(line => {
                        if (line.includes(payload.searchPattern)) {
                            // insertIndex stores the index for adding code injection
                            if (payload.injectAbove) {
                                // inject code snippet above search pattern code line
                                insertIndex = codeArray.indexOf(line)
                            } else {
                                // inject code snippet below search pattern code line
                                insertIndex = codeArray.indexOf(line) + 1
                            }
                            // find number of tabs before search pattern line
                            // this will be the base tabs count for code injection lines
                            // TODO: refactor
                            for (let index = 0; index < line.length; index++) {
                                if (line.charCodeAt(index) == 32) {
                                    tabString += " "
                                } else {
                                    break
                                }
                            }
                            // TODO: refactor
                            // add payload's tabs to tabString
                            for (let index = 0; index < payload.tabs; index++) {
                                tabString += " "
                            }
                            // TODO: refactor
                            // prefix tabs with each line in payload.injection
                            let injectionArray = payload.injection.split("\n")
                            let paddedInjectionArray = injectionArray.map(
                                injection => {
                                    return tabString + injection
                                }
                            )
                            // convert paddedInjectionArray into string
                            tabbedInjection = paddedInjectionArray.join("\n")
                        }
                    })
                    // if search pattern is found, perform code injection
                    if (insertIndex !== -1) {
                        // splice adds code at specified index
                        // 0 means no elements are deleted from array
                        codeArray.splice(insertIndex, 0, tabbedInjection)

                        // reset values for next payload iteration
                        insertIndex = -1
                        tabString = ""
                        tabbedInjection = ""
                    }
                }
            })

            // TODO: refactor
            // make a string from the codeArray
            let codeString = ""
            codeString = codeArray.join("\n")
            // fs.writeFile the string in target file
            fs.writeFile(targetFilePath, codeString, error => {
                error === null
                    ? console.log("code injections successfull")
                    : console.log(err)
            })
            codeString = ""
        }
    })
}

/**
 * removes specified code snippet from specified code file
 * @param {string} targetFilePath Path to codefile to be modified
 * @param {Array} payloadArray  objects array with code injections
 **/
const remove = function(targetFilePath, payloadArray) {
    // open target file
    fs.readFile(targetFilePath, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            // read codefile's code in an array
            let code = data.toString()
            let codeArray = code.split("\n")
            
            // loop through each payload item
            payloadArray.forEach((payload) => {
                // loop thourgh each codeArray line to check if codeToDelete is found
                codeArray.forEach((line) => {
                    if(line.includes(payload.codeToRemove)){
                        codeArray.splice(codeArray.indexOf(line), 1)
                    }
                })
            })

            // make a string from the codeArray
            let codeString = ""
            codeString = codeArray.join("\n")
            // fs.writeFile the string in target file
            fs.writeFile(targetFilePath, codeString, error => {
                error === null
                    ? console.log("code deletions successfull")
                    : console.log(err)
            })
            codeString = ""
        }
    })
}

module.exports = { inject, remove }
