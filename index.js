//AUTHENTICATION
const { login } = require('./functions/auth/login');

//CARDS
const { getCards } = require('./functions/cards/getCards');

//CHALLENGES
const { getChallenges } = require('./functions/challenges/getChallenges');

//CLANS
const { getClan } = require('./functions/clans/getClan');
const { getClanCurrentRiverRace } = require('./functions/clans/getClanCurrentRiverRace');
const { getClanCurrentWar } = require('./functions/clans/getClanCurrentWar');
const { getClanMembers } = require('./functions/clans/getClanMembers');
const { getClanRiverRaceLog } = require('./functions/clans/getClanRiverRaceLog');
const { getClanWarLog } = require('./functions/clans/getClanWarLog');
const { searchClan } = require('./functions/clans/searchClan');

//GLOBAL TOURNAMENTS
const { getGlobalTournaments } = require('./functions/globaltournaments/getGlobalTournaments');

//PLAYERS
const { getPlayer } = require('./functions/players/getPlayer');
const { getPlayerUpcomingChests } = require('./functions/players/getPlayerUpcomingChests');
const { getPlayerBattleLog } = require('./functions/players/getPlayerBattleLog');

module.exports = { login, getCards, getChallenges, getGlobalTournaments, getPlayer, getPlayerUpcomingChests, getPlayerBattleLog, getClan, getClanMembers, getClanCurrentWar, getClanWarLog, getClanCurrentRiverRace, getClanRiverRaceLog, searchClan };