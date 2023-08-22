const fetch = require('node-fetch');
const { getGlobalTournaments } = require('../../functions/globaltournaments/getGlobalTournaments');
const context = require('../../functions/auth/context'); // Import your context module

jest.mock('node-fetch');
jest.mock('../../functions/auth/context'); // Mock the context module

describe('getGlobalTournaments function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear(); // Mock the getAuthToken function
    });

    it('should fetch global tournaments with the auth token', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ tournaments: ['Tournament1', 'Tournament2'] }),
        });

        const result = await getGlobalTournaments();

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashroyale.com/v1/globaltournaments',
            {
                headers: { Authorization: 'Bearer dummyAuthToken' },
            }
        );

        expect(result).toEqual({ tournaments: ['Tournament1', 'Tournament2'] });
    });

    it('should handle errors when fetching global tournaments', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await getGlobalTournaments();
        } catch (error) {
            expect(error.message).toBe('Fetch error');
        }
    });
});
