const fetch = require('node-fetch');
/**
 * Retrieves clan current river race by clanTag.
 * @param {string} clanTag - The tag of the clan.
 * @returns {Promise<JSON>} JSON
 */

async function getClanCurrentRiverRace(clanTag) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    if (typeof clanTag !== 'string') {
        return { 'error': '404', 'reason': 'ClanTag must be a string', 'message': 'notFound' };
    }
    if (clanTag.startsWith('#')) {
        const headers = { 'Authorization': `Bearer ${authToken}` };
        let clanTagConverString = encodeURIComponent(clanTag);
        var fetchUrl = `https://api.clashroyale.com/v1/clans/${clanTagConverString}/currentriverrace`;
        const response = await fetch(fetchUrl, { headers });
        const data = await response.json();
        return data;
    } else return { 'error': '404', 'reason': 'clanTag must start with "#"', 'message': 'notFound' };
}

module.exports = { getClanCurrentRiverRace };  