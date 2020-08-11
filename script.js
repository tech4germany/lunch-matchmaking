const liner = new (require('n-readlines'))('people.csv');
const teams = require('./teams.json').teams;

people = [];
let line;

while (line = liner.next()) {
    let parts = line.toString('utf8').split(',');
    people.push({
        "in-team": Number(parts[0]),
        "id": Number(parts[1]),
        "name": parts[2],
        "discipline": parts[3].substr(0, parts[3].length - 1) // strip away new line character
    });
}

console.log(people);
