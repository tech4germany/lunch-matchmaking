const readlines = require('n-readlines');
const teams = require('./teams.json').teams;

people = {};
let line;
let liner = new readlines('people.csv');

while (line = liner.next()) {
    let parts = line.toString('utf8').split(',');
    let id = Number(parts[1]);
    people[id] = {
        "in_team": Number(parts[0]),
        "id": id,
        "name": parts[2],
        "discipline": parts[3].substr(0, parts[3].length - 1), // strip away new line character
        "already_met_with": []
    };
}

liner = new readlines('lunch1.csv');
while (line = liner.next()) {
    let parts = line.toString('utf8').split(',');
    let id1 = Number(parts[0]);
    let id2 = Number(parts[1]);
    people[id1].already_met_with.push(id2);
    people[id2].already_met_with.push(id1);
}

console.log(pairsAlreadyMet);
console.log(people);
