const fetch = require('node-fetch');
const { getCards } = require('../../functions/cards/getCards');
const context = require('../../functions/auth/context'); // Import your context module

jest.mock('node-fetch');
jest.mock('../../functions/auth/context'); // Mock the context module

describe('getCards function', () => {
    beforeEach(() => {
        fetch.mockClear();
        context.getAuthToken.mockClear(); // Mock the getAuthToken function
    });

    it('should fetch cards without limit', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ cards: ['Card1', 'Card2'] }),
        });

        const result = await getCards();

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashroyale.com/v1/cards',
            {
                headers: { Authorization: 'Bearer dummyAuthToken' },
            }
        );

        expect(result).toEqual({ cards: ['Card1', 'Card2'] });
    });

    it('should fetch cards with a specified limit', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({ cards: ['Card1', 'Card2'] }),
        });

        const result = await getCards(10);

        expect(fetch).toHaveBeenCalledWith(
            'https://api.clashroyale.com/v1/cards?limit=10',
            {
                headers: { Authorization: 'Bearer dummyAuthToken' },
            }
        );

        expect(result).toEqual({ cards: ['Card1', 'Card2'] });
    });

    it('should handle the case when limit is not a number', async () => {
        const result = await getCards('not_a_number');

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be a number',
            message: 'notFound',
        });
    });

    it('should handle errors when fetching cards', async () => {
        context.getAuthToken.mockReturnValue('dummyAuthToken');

        fetch.mockRejectedValue(new Error('Fetch error'));

        try {
            await getCards();
        } catch (error) {
            expect(error.message).toBe('Fetch error');
        }
    });
});
