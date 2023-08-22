const fetch = require('node-fetch');

/**
 *  Retrieves all global tournaments.
 *  @returns {Promise<JSON>} JSON
 */

async function getGlobalTournaments() {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    var fetchUrl = 'https://api.clashroyale.com/v1/globaltournaments';
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getGlobalTournaments };  