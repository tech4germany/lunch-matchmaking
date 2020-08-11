const readlines = require('n-readlines');
const teams = require('./teams.json').teams;

people = [];
let line;
let liner = new readlines('people.csv');

while (line = liner.next()) {
    let parts = line.toString('utf8').split(',');
    people.push({
        "in-team": Number(parts[0]),
        "id": Number(parts[1]),
        "name": parts[2],
        "discipline": parts[3].substr(0, parts[3].length - 1) // strip away new line character
    });
}

pairsAlreadyMet = [];

liner = new readlines('lunch1.csv');
while (line = liner.next()) {
    let parts = line.toString('utf8').split(',');
    let id1 = Number(parts[0]);
    let id2 = Number(parts[1]);
    pairsAlreadyMet.push({
        "id1": id1,
        "id2": id2
    });
}

console.log(pairsAlreadyMet);
console.log(people);
