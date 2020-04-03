# codecook

Makes it easy to add / remove code snippets in specified code file. 

### Following file types tested so far:
- .py
- .js
- .html
- .txt

### Install:

`$ npm install codecook`

#### Functions Available:
- inject()

allows you to inject snippets of code in exixting code files

- remove()

allows you to remove snippets of code from existing code files

### Getting Started
#### Import
```
// import codecook
const codecook = require('codecook')
```

#### How to Inject Code
```
// specify params
const targetFilePath = 'absolutePath/to/target/file'
const payloadArray = [
    {
        // tabs is how much indentation you want for injected code
        // it is number of spaces
        // 0 is the default. same indentation as search pattern code line.
        // for a tab you can specify 4 or 2 depending on your IDE 
        "tabs": 0,
        
        "searchPattern" : "search some code line",
        "injection": "code to inject",
        
        // do you want to inject code above search pattern code line or below it?
        // by default, code is injected below
        "injectAbove": false,
        
        // setting this to true will allow you to add duplicate code
        // default should be false
        "allowDuplicates": false
    }
]

// check console for message on completion
codecook.inject(targetFilePath, payloadArray) 
```
#### inject() updates
- [x] inject single line of code 
- [x] inject multiple lines of code
- [x] check if the single line being injected already exists
- [ ] check for duplicate multiple lines of code when injecting [WIP]


#### How to Remove Code
```
// specify params
const targetFilePath = 'absolutePath/to/target/file'
const payloadArray = [
    {
        "codeToRemove": "single line of code you would like to remove" 
    },
    {
        "codeToRemove": "another single line of code you would like to remove" 
    }
]

// check console for message on completion
codecook.remove(targetFilePath, payloadArray)
```
#### remove() updates
- [x] can remove single line of code
- [ ] remove multiple lines of code [WIP]


Suggestions, bugs, enhancements are welcome via PR. Hope you find this library helpful!


