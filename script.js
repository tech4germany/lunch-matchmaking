const lineReader = require('line-reader');
const teams = require('./teams.json');

console.log(teams);

lineReader.eachLine('people.csv', line => {
    console.log(line);
});
