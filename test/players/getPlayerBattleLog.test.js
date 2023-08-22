const fetch = require('node-fetch');
const { getPlayerBattleLog } = require('../../functions/players/getPlayerBattleLog');
const context = require('../../functions/auth/context'); // Import your context module

jest.mock('node-fetch');
jest.mock('../../functions/auth/context'); // Mock the context module

describe('getPlayerBattleLog function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear(); // Mock the getAuthToken function
    });

    it('should fetch battle log with the auth token when playerTag starts with "#"', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ battleLog: ['Battle1', 'Battle2'] }),
        });

        const result = await getPlayerBattleLog('#PlayerTag');

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashroyale.com/v1/players/%23PlayerTag/battlelog',
            {
                headers: { Authorization: 'Bearer dummyAuthToken' },
            }
        );

        expect(result).toEqual({ battleLog: ['Battle1', 'Battle2'] });
    });

    it('should return an error when playerTag is not a string', async () => {
        const result = await getPlayerBattleLog(123);

        expect(result).toEqual({
            error: '404',
            reason: 'PlayerTag must be a string',
            message: 'notFound',
        });
    });

    it('should return an error when playerTag does not start with "#"', async () => {
        const result = await getPlayerBattleLog('PlayerTagWithoutHash');

        expect(result).toEqual({
            error: '404',
            reason: 'playerTag must start with "#"',
            message: 'notFound',
        });
    });

    it('should handle errors when fetching battle log', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await getPlayerBattleLog('#PlayerTag');
        } catch (error) {
            expect(error.message).toBe('Fetch error');
        }
    });
});
