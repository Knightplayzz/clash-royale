const fetch = require('node-fetch');

/**
 *  Retrieves all challenges.
 *  @returns {Promise<JSON>} JSON
 */

async function getChallenges() {
    const context = require('../auth/context');
    const authToken = context.getAuthToken();
    var fetchUrl = 'https://api.clashroyale.com/v1/challenges';
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const response = await fetch(fetchUrl, { headers });
    const data = await response.json();
    return data;
}

module.exports = { getChallenges };  