const fetch = require('node-fetch');
/**
 * Retrieves clans based on search results.
 * @param {string} name - The tag of the clan.
 * 
 * @param {number} locationId - The id of the location.
 * 
 * @param {number} minMembers - The minimum members that are in the clan.
 * 
 * @param {number} maxMembers - The maximum members that are in the clan. 
 * 
 * @param {number} minScore - The minimum clan score that the clan has.
 * 
 *  @param {number} limit - Limit the number of items returned in the response (Less or equal to 15).
 *  @returns {Promise<JSON>} JSON
 */

async function searchClan(name, locationId, minMembers, maxMembers, minScore, limit) {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();

    if (typeof name !== 'string' && name !== undefined) { return { 'error': '404', 'reason': 'Name must be a string', 'message': 'notFound' }; }
    if (typeof locationId !== 'number' && locationId !== undefined) { return { 'error': '404', 'reason': 'LocationId must be a number', 'message': 'notFound' }; }
    if (typeof minMembers !== 'number' && minMembers !== undefined) { return { 'error': '404', 'reason': 'MinMembers must be a number', 'message': 'notFound' }; }
    if (typeof maxMembers !== 'number' && maxMembers !== undefined) { return { 'error': '404', 'reason': 'MaxMembers must be a number', 'message': 'notFound' }; }
    if (typeof minScore !== 'number' && minScore !== undefined) { return { 'error': '404', 'reason': 'MinScore must be a number', 'message': 'notFound' }; }
    if (typeof limit !== 'number' && limit !== undefined) { return { 'error': '404', 'reason': 'Limit must be a number', 'message': 'notFound' }; }

    //LIMIT IS REQUIRED
    if (limit === undefined) { return { 'error': '404', 'reason': 'You must set a limit', 'message': 'notFound' }; }
    if (limit > 15) { return { 'error': '404', 'reason': 'Limit must be 15 or less', 'message': 'notFound' }; }

    //RETURNS IF NO VALUE
    var fetchUrl = 'https://api.clashroyale.com/v1/clans?';
    let convertName = encodeURIComponent(name);
    if (name !== undefined) { fetchUrl = fetchUrl + `name=${convertName}&`; }
    if (locationId !== undefined) { fetchUrl = fetchUrl + `locationId=${locationId}&`; }
    if (minMembers !== undefined) { fetchUrl = fetchUrl + `minMembers=${minMembers}&`; }
    if (maxMembers !== undefined) { fetchUrl = fetchUrl + `maxMembers=${maxMembers}&`; }
    if (minScore !== undefined) { fetchUrl = fetchUrl + `minScore=${minScore}&`; }
    fetchUrl = fetchUrl + `limit=${limit}`;
    var realFetchUrl = fetchUrl;
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(realFetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { searchClan };  