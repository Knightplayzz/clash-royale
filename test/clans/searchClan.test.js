const fetch = require('node-fetch');
const { searchClan } = require('../../functions/clans/searchClan'); // Update import
const context = require('../../functions/auth/context'); // Mock this dependency

jest.mock('node-fetch'); // Mocking the fetch module
jest.mock('../../functions/auth/context'); // Mocking the context module

describe('searchClan function', () => { // Update the function name
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it('should return clan search results if parameters are valid and fetch is successful', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clanSearchResults: 'mockedClanSearchResults' }), // Update the property name
        });

        const result = await searchClan('ClanName', 123, 5, 20, 1000, 10); // Update the function call

        expect(fetch).toHaveBeenCalledWith('https://api.clashroyale.com/v1/clans?name=ClanName&locationId=123&minMembers=5&maxMembers=20&minScore=1000&limit=10', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clanSearchResults: 'mockedClanSearchResults' }); // Update the property name
    });

    it('should return error message if name is not a string', async () => {
        const result = await searchClan(123, 123, 5, 20, 1000, 10); // Update the function call

        expect(result).toEqual({
            error: '404',
            reason: 'Name must be a string',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if locationID is not a number', async () => {
        const result = await searchClan('xxx', 'x', 5, 20, 1000, 10); // Update the function call

        expect(result).toEqual({ 'error': '404', 'reason': 'LocationId must be a number', 'message': 'notFound' });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if MinMembers is not a number', async () => {
        const result = await searchClan('xxx', 1, 'xxx', 20, 1000, 10); // Update the function call
        expect(result).toEqual({ 'error': '404', 'reason': 'MinMembers must be a number', 'message': 'notFound' });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if MaxMembers is not a number', async () => {
        const result = await searchClan('xxx', 1, 2, 'xxx', 1000, 10); // Update the function call
        expect(result).toEqual({ 'error': '404', 'reason': 'MaxMembers must be a number', 'message': 'notFound' });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if MinScore is not a number', async () => {
        const result = await searchClan('xxx', 1, 2, 20, '1000', 10); // Update the function call
        expect(result).toEqual({ 'error': '404', 'reason': 'MinScore must be a number', 'message': 'notFound' });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if limit is not a number', async () => {
        const result = await searchClan('xxx', 1, 2, 20, 3, '20'); // Update the function call
        expect(result).toEqual({ 'error': '404', 'reason': 'Limit must be a number', 'message': 'notFound' });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });
    //next

    it('should construct the fetch URL correctly when parameters are provided', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clanSearchResults: 'mockedClanSearchResults' }),
        });

        const result = await searchClan('ClanName', 123, 5, 20, 1000, 10);

        expect(fetch).toHaveBeenCalledWith('https://api.clashroyale.com/v1/clans?name=ClanName&locationId=123&minMembers=5&maxMembers=20&minScore=1000&limit=10', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clanSearchResults: 'mockedClanSearchResults' });
    });

    it('should construct the fetch URL correctly when parameters are provided', async () => {
        context.getAuthToken.mockReturnValue('valid_auth_token');
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue({ clanSearchResults: 'mockedClanSearchResults' }),
        });

        const result = await searchClan(undefined, undefined, undefined, undefined, undefined, 10);

        expect(fetch).toHaveBeenCalledWith('https://api.clashroyale.com/v1/clans?limit=10', {
            headers: { Authorization: 'Bearer valid_auth_token' },
        });
        expect(result).toEqual({ clanSearchResults: 'mockedClanSearchResults' });
    });

    it('should return error message if limit is not set', async () => {
        const result = await searchClan('ClanName', 123, 5, 20, 1000); // Update the function call

        expect(result).toEqual({
            error: '404',
            reason: 'You must set a limit',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });

    it('should return error message if limit is greater than 15', async () => {
        const result = await searchClan('ClanName', 123, 5, 20, 1000, 16); // Update the function call

        expect(result).toEqual({
            error: '404',
            reason: 'Limit must be 15 or less',
            message: 'notFound',
        });
        expect(fetch).not.toHaveBeenCalled(); // Ensure fetch is not called
    });


});