const fetch = require('node-fetch');
const { getChallenges } = require('../../functions/challenges/getChallenges');
const context = require('../../functions/auth/context'); // Import your context module

jest.mock('node-fetch');
jest.mock('../../functions/auth/context'); // Mock the context module

describe('getChallenges function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear(); // Mock the getAuthToken function
    });

    it('should fetch challenges with the auth token', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ challenges: ['Challenge1', 'Challenge2'] }),
        });

        const result = await getChallenges();

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashroyale.com/v1/challenges',
            {
                headers: { Authorization: 'Bearer dummyAuthToken' },
            }
        );

        expect(result).toEqual({ challenges: ['Challenge1', 'Challenge2'] });
    });

    it('should handle errors when fetching challenges', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await getChallenges();
        } catch (error) {
            expect(error.message).toBe('Fetch error');
        }
    });
});
