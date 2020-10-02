
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

console.log(cohorts);
