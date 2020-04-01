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
const searchPattern = 'some pattern'
const codeToInject = 'this is some code'

// inject code
codecook.inject(targetFilePath, searchPattern, codeToInject) // check console for message on completion
```


This is an early prototype and needs more testing. 

Suggestions, bugs, enhancements are most welcome via PR! Thanks for your contributions. 
