const readlines = require('n-readlines');
// const teams = require('./teams.json').teams;

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
    if (parts.length > 2) {
        let id3 = Number(parts[2]);
        people[id1].already_met_with.push(id3);
        people[id2].already_met_with.push(id3);
        people[id3].already_met_with.push(id1);
        people[id3].already_met_with.push(id2);
    }
}

const randomIntFromInterval = (min, max) => { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};

let unpairedPeopleIds = Object.keys(people);
let pairs = [];

for (let j = 0; j < 20; j ++) {
    let p1id = unpairedPeopleIds[0];
    let suitablePersons = [];
    for (let i = 1; i < unpairedPeopleIds.length; i++) {
        let p2IdToCheck = unpairedPeopleIds[i];
        let p1 = people[p1id];
        if (p1.already_met_with.includes(p2IdToCheck)) {
            continue;
        }
        let p2 = people[p2IdToCheck];
        if (p1.in_team === p2.in_team) {
            continue;
        }
        suitablePersons.push(p2IdToCheck);
    }
    let p2id = suitablePersons[randomIntFromInterval(0, suitablePersons.length - 1)];

    if (p1id !== undefined && p2id !== undefined) {
        pairs.push([people[p1id].name, people[p2id].name]);
    }

    unpairedPeopleIds.splice(unpairedPeopleIds.indexOf(p2id), 1);
    unpairedPeopleIds.splice(0, 1);
}

console.log(pairs);
