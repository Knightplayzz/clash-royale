const fetch = require('node-fetch');
const { getPlayer } = require('../../functions/players/getPlayer');
const context = require('../../functions/auth/context'); // Import your context module

jest.mock('node-fetch');
jest.mock('../../functions/auth/context'); // Mock the context module

describe('getPlayer function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear(); // Mock the getAuthToken function
    });

    it('should fetch player data with the auth token when playerTag starts with "#"', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ playerData: 'PlayerData' }),
        });

        const result = await getPlayer('#PlayerTag');

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashroyale.com/v1/players/%23PlayerTag',
            {
                headers: { Authorization: 'Bearer dummyAuthToken' },
            }
        );

        expect(result).toEqual({ playerData: 'PlayerData' });
    });

    it('should return an error when playerTag is not a string', async () => {
        const result = await getPlayer(123);

        expect(result).toEqual({
            error: '404',
            reason: 'PlayerTag must be a string',
            message: 'notFound',
        });
    });

    it('should return an error when playerTag does not start with "#"', async () => {
        const result = await getPlayer('PlayerTagWithoutHash');

        expect(result).toEqual({
            error: '404',
            reason: 'playerTag must start with "#"',
            message: 'notFound',
        });
    });

    it('should handle errors when fetching player data', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await getPlayer('#PlayerTag');
        } catch (error) {
            expect(error.message).toBe('Fetch error');
        }
    });
});
