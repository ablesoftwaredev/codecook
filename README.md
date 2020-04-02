# codecook

Makes it easy to add code snippets to specified code file. 

#### Following file types tested so far:
- .py
- .js
- .html
- .txt

#### Install:

`npm install codecook`

#### Usage:
```
// import codecook
const codecook = require('codecook')

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
        "injectAbove": false
    }
]

// code is injected below the search pattern code line
// check console for message on completion
codecook.inject(targetFilePath, payloadArray) 
```

Suggestions, bugs, enhancements are most welcome via PR. Hope you find this library helpful!


