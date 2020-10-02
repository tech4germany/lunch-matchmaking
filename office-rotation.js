
let teams = [];
// only consider T4G fellow teams at this point
require('./input/teams.json').teams.filter(team => team.id < 8).map(team => teams.push(team));

console.log(teams);
