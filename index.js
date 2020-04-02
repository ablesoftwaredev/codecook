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
                // loop through each line in codeArray and check if search pattern is found
                codeArray.forEach(line => {
                    if (line.includes(payload.searchPattern)) {
                        // insertIndex stores the index for adding code injection
                        insertIndex = codeArray.indexOf(line) + 1 // TODO: add if / else for inject above or below search pattern
                        // find number of tabs before search pattern line
                        // this will be the base tabs count for code injection lines
                        for (let index = 0; index < line.length; index++) {
                            if (line.charCodeAt(index) == 32) {
                                tabString += " "
                            } else {
                                break
                            }
                        }
                        // add payload's tabs to tabString
                        for (let index = 0; index < payload.tabs; index++) {
                            tabString += " "
                        }

                        // prefix tabs with each line in payload.injection
                        let injectionArray = payload.injection.split('\n')
                        let paddedInjectionArray = injectionArray.map((injection) => {
                            return (tabString + injection)
                        })
                        // convert paddedInjectionArray into string
                        tabbedInjection = paddedInjectionArray.join('\n')
                    }
                })
                // if search pattern is found, perform code injection
                if(insertIndex !== -1)
                {
                    // splice adds code at specified index
                    // 0 means no elements are deleted from array
                    codeArray.splice(insertIndex, 0, tabbedInjection)

                    // reset values for next payload iteration
                    insertIndex = -1
                    tabString = ''
                    tabbedInjection = ''
                }
            })

            // make a string from the codeArray
            let codeString = ""
            codeString = codeArray.join('\n')
            // fs.writeFile the string in target file
            fs.writeFile(targetFilePath, codeString, (error) => {
                error === null ? console.log('code injections successfull') : console.log(err);
            })
            codeString = ''
        }
    })
}

module.exports = { insert, inject }
