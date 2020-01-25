const fs = require('fs')

var i = fs.readFileSync('./.gitignore', 'utf-8');

if(process.argv[2] == 'prod'){

}
else if (process.argv[2] == 'dev'){
    
}