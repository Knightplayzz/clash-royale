const fetch = require('node-fetch');
const { getClanCurrentRiverRace } = require('../../functions/clans/getClanCurrentRiverRace'); // Update import
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('getClanCurrentRiverRace function', () => { // Update the function name
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return clan current river race data if clanTag starts with "#" and fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clanCurrentRiverRaceData: 'mockedClanCurrentRiverRaceData' }), // Update the property name
        });

        const result = await getClanCurrentRiverRace('#ABC123'); // Update the function call

        expect(fetch).toHaveBeenCalledWith('https://api.clashroyale.com/v1/clans/%23ABC123/currentriverrace', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clanCurrentRiverRaceData: 'mockedClanCurrentRiverRaceData' }); // Update the property name
    });

    it('should return error message if clanTag does not start with "#" symbol', async () => {
        const result = await getClanCurrentRiverRace('ABC123'); // Update the function call

        expect(result).toEqual({
            error: '404',
            reason: 'clanTag must start with "#"',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if clanTag is not a string', async () => {
        const result = await getClanCurrentRiverRace(123); // Update the function call

        expect(result).toEqual({
            error: '404',
            reason: 'ClanTag must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
});
