/**
 * Responsibility:
 * searches for pattern in specified code file and inserts specified code above / below it.
 * it then returns the modified code
 */
const fs = require("fs")
const path = require("path")
const injectUtils = require('./injectUtils')
const removeUtils = require('./removeUtils')
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
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
                // let canInject = true
                // canInject = injectUtils.checkForDuplicateCode(codeArray, payload.injection)
                let canInject = injectUtils.checkForDuplicateCode(codeArray, payload.injection)
                if(canInject){
                    // loop through each line in codeArray and check if search pattern is found
                    codeArray.forEach(line => {
                        if (line.includes(payload.searchPattern)) {
                            // insertIndex stores the index for adding code injection
                            insertIndex = injectUtils.getInsertIndex(codeArray, line, payload.injectAbove)

                            // get tabString
                            tabString = injectUtils.getTabString(line, payload.tabs)

                            // get tabbedInjection
                            tabbedInjection = injectUtils.getTabbedInjection(payload.injection, tabString)
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

            // save the updated code in target file
            injectUtils.saveUpdatedCode(targetFilePath, codeArray)
        }
    })
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
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
                // check if codeToDelete is found in codeArray
                let canDelete = removeUtils.doesCodeToDeleteExist(codeArray, payload.codeToRemove)
                if(canDelete){
                    // make an array from payload.codeToRemove
                    let codeToRemoveArray = payload.codeToRemove.split('\n')
                    // get the num of lines in payload.codeToRemove
                    let numOfLinesToDelete = codeToRemoveArray.length
                    // loop through codeArray and match line 0 of codeToRemoveArray
                    let deleteStartIndex = 0
                    for (let index = 0; index < codeArray.length; index++) {
                        if(codeArray[index].includes(codeToRemoveArray[0])){
                            deleteStartIndex = index
                            break
                        }
                    }
                    codeArray.splice(deleteStartIndex, numOfLinesToDelete)
                }
            })

            // save updated code in target file
            removeUtils.saveUpdatedCode(targetFilePath, codeArray)
        }
    })
}
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
module.exports = { inject, remove }
