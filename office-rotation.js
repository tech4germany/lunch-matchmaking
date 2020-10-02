
let teams = {};
// only consider T4G fellow teams at this point
require('./input/teams.json').teams.filter(team => team.id < 8).map(team => teams[team.short] = team);
let teamIDs = Object.keys(teams);

n = Math.pow(2, teamIDs.length);

let targetGroupSize = 4;
let groupsOfTargetGroupSize = [];

for (let i = 0; i < n; i++) {
    let binary = i.toString(2); // via stackoverflow.com/a/9939785
    let zerosToFill = teamIDs.length - binary.length;
    for (let j = 0; j < zerosToFill; j++) {
        binary = '0' + binary
    }
    let arr = binary.split('');
    if (arr.filter(char => char === '1').length === targetGroupSize) {
        let group = [];
        for (let j = 0; j < teamIDs.length; j++) {
            if (arr[j] === '1') {
                group.push(teamIDs[j]);
            }
        }
        groupsOfTargetGroupSize.push(group);
    }
}

let cohorts = [];

for (let i = 0; i < groupsOfTargetGroupSize.length / 2; i ++) {
    // why is this the case?? but it is correct
    let group = groupsOfTargetGroupSize[i];
    let counterGroup = groupsOfTargetGroupSize[groupsOfTargetGroupSize.length - 1 - i];
    cohorts.push([group, counterGroup]);
}

// TEST
for (let i = 0; i < cohorts.length; i ++) {
    // via stackoverflow.com/a/33034768
    if (cohorts[i][0].filter(x => cohorts[i][1].includes(x)).length > 0) {
        console.log("TEST FAILED for ", cohorts[i]);
    }
}

// FILTER OUT BASED ON CRITERIA

const readlines = require('n-readlines');
people = {};
let line;
let liner = new readlines('input/people.csv');
while (line = liner.next()) {
    let parts = line.toString('utf8').split(',');
    let id = parts[2]; // first name with first char of last name if necessary
    let team = Number(parts[0]);
    if (team >= 8) {
        continue;
    }
    people[id] = {
        "in_team": team,
        "id": id,
        "name": parts[3],
        "inseparable_from": []
    };
}

liner = new readlines('input/blockers/office-rotation-blocker.csv');
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
            people[idSelf].inseparable_from.push(idOther);
            people[idOther].inseparable_from.push(idSelf);
        }
    }
}

const getPeopleInGroup = _teamIDs => {
    let ppl = [];
    for (let i = 0; i < _teamIDs.length; i ++) {
        let teamIDinteger = teams[_teamIDs[i]].id;
        ppl = [].concat.apply(ppl, Object.keys(people).filter(id => people[id].in_team === teamIDinteger));
    }
    return ppl;
};

for (let i = 0; i < 1; i ++) {
    let group1 = cohorts[i][0];
    let peopleInGroup1 = getPeopleInGroup(group1);
    let group2 = cohorts[i][0];
    let peopleInGroup2 = getPeopleInGroup(group2);

    // TODO
}
