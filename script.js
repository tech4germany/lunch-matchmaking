const liner = new (require('n-readlines'))('people.csv');
const teams = require('./teams.json').teams;

people = [];
let line;

while (line = liner.next()) {
    let parts = line.toString('utf8').split(',');
    people.push({
        "in-team": parts[0],
        "name": parts[1],
        "discipline": parts[2].substr(0, parts[2].length - 1) // strip away new line character
    });
}

console.log(people);
