const fetch = require('node-fetch');
const { getPlayerUpcomingChests } = require('../../functions/players/getPlayerUpcomingChests');
const context = require('../../functions/auth/context'); // Import your context module

jest.mock('node-fetch');
jest.mock('../../functions/auth/context'); // Mock the context module

describe('getPlayerUpcomingChests function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear(); // Mock the getAuthToken function
    });

    it('should fetch upcoming chests with the auth token when playerTag starts with "#"', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ upcomingChests: ['Chest1', 'Chest2'] }),
        });

        const result = await getPlayerUpcomingChests('#PlayerTag');

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashroyale.com/v1/players/%23PlayerTag/upcomingchests',
            {
                headers: { Authorization: 'Bearer dummyAuthToken' },
            }
        );

        expect(result).toEqual({ upcomingChests: ['Chest1', 'Chest2'] });
    });

    it('should return an error when playerTag is not a string', async () => {
        const result = await getPlayerUpcomingChests(123);

        expect(result).toEqual({
            error: '404',
            reason: 'PlayerTag must be a string',
            message: 'notFound',
        });
    });

    it('should return an error when playerTag does not start with "#"', async () => {
        const result = await getPlayerUpcomingChests('PlayerTagWithoutHash');

        expect(result).toEqual({
            error: '404',
            reason: 'playerTag must start with "#"',
            message: 'notFound',
        });
    });

    it('should handle errors when fetching upcoming chests', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await getPlayerUpcomingChests('#PlayerTag');
        } catch (error) {
            expect(error.message).toBe('Fetch error');
        }
    });
});
