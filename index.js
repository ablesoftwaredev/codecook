/**
 * Responsibility:
 * searches for pattern in specified code file and inserts specified code above/below it.
 * it then returns the modified code
 * params for codeData:
 * "rootPath": string
   "code": string
   "searchPattern": string
   "cmdName": string
   "insertLevel": 1 = below, -1 = above,
   "codeToInsert": string
 */
const fs = require("fs")
const path = require("path")
const vscode = require("vscode")


const insert = function(codeData) {
    // split code string into array via \n
    let codeLines = codeData.code.split("\n")

    // find the index of searchPattern in codeLines
    let searchPattern = codeData["searchPattern"]
    let insertIndex = 0
    codeLines.forEach(line => {
        if (line.includes(searchPattern)) {
            insertIndex = codeLines.indexOf(line)
        }
    })
    // if pattern found, insert data above / below it
    if (insertIndex != 0) {
        codeLines.splice(insertIndex + 1, 0, codeData["codeToInsert"])
    }
    // write updated code to extension.js
    // create code string
    let codeString = ""
    codeLines.forEach(line => {
        codeString += line += "\n"
    })
    let testPath = path.join(codeData.rootPath, "extension.js")
    // write updated code to extension.js
    fs.writeFile(testPath, codeString, error => {
        if (error === null) {
            vscode.window.showInformationMessage(
                "command created successfully."
            )
        } else {
            vscode.window.showInformationMessage("command not created...")
        }
    })

    return codeString
}

/**
 * insert code in specified file using search expression
 * @param {string} targetFilePath Path to codefile to be modified
 * @param {string} searchPattern  Search pattern in codefile
 * @param {string} codeToInject   code snippet to be injected
**/
const inject = function(targetFilePath, searchPattern, codeToInject) {
    // get target file path
    // get search pattern
    // get code to inject
    // get inject level (above / below)
    // open target file
    // read its code in an array
    // loop through each line in array and check if search pattern is found
    // if found, insert code above / below the line index
    // make a string from the array
    // fs.writeFile the string in target file
}

module.exports = { insert, inject }
