const fs = require('fs');
const readlines = require('n-readlines');
// const teams = require('input/teams.json').teams;

people = {};
let line;
let liner = new readlines('input/people.csv');

while (line = liner.next()) {
    let parts = line.toString('utf8').split(',');
    let id = parts[2]; // first name with first char of last name if necessary
    people[id] = {
        "in_team": Number(parts[0]),
        "id": id,
        "name": parts[3],
        "discipline": parts[4].substr(0, parts[4].length - 1), // strip away new line character
        "already_met_with": [],
        "testcount": 0
    };
}

const importBlockers = csvFile => {
    liner = new readlines(csvFile);
    while (lineRaw = liner.next()) {
        line = lineRaw.toString('utf8');
        if (!line || line.length === 0 || line.charAt(0) === '#') {
            continue;
        }
        let parts = line.split(',');
        for (let i = 0; i < parts.length; i ++) {
            let idSelf = parts[i];
            for (let j = i + 1; j < parts.length; j ++) {
                let idOther = parts[j];
                people[idSelf].already_met_with.push(idOther);
                people[idOther].already_met_with.push(idSelf);
            }
        }
    }
};

importBlockers('input/blockers/other.csv');
importBlockers('input/blockers/lunch1.csv');
importBlockers('input/blockers/lunch2.csv');

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

    // TODO make the loop better so that these undefined-checks are not necessary
    if (p1id !== undefined && p2id !== undefined) {
        pairs.push([p1id, p2id]);
    }

    unpairedPeopleIds.splice(unpairedPeopleIds.indexOf(p2id), 1);
    unpairedPeopleIds.splice(0, 1);
}

// pretty print matches
let csvContent = '';
for (let i = 0; i < pairs.length; i++) {
    let id1 = pairs[i][0];
    let id2 = pairs[i][1];
    console.log(people[id1].name + " & " + people[id2].name);
    csvContent += id1 + ',' + id2 + '\n';
}

// write them out as next lunch.csv
fs.writeFile('input/blockers/lunch3.csv', csvContent, err => {});


// TESTS ---------------------------------------------------------

for (let i = 0; i < pairs.length; i++) {
    let p1 = people[pairs[i][0]];
    let p2 = people[pairs[i][1]];
    if (p1.in_team === p2.in_team || p1.already_met_with.includes(p2.id) || p1.already_met_with.includes(p2.id)) {
        console.log("ERROR: ", p1.id, p2.id);
    }
    p1.testcount += 1;
    p2.testcount += 1;
}

for (let i = 0; i < Object.keys(people).length; i++) {
    let person = people[Object.keys(people)[i]];
    if (person.testcount !== 1) {
        console.log("Testcount != 1: ", person);
    }
}
