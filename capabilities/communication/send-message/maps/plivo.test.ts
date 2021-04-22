import { SuperfaceClient } from '@superfaceai/sdk';

describe('communication/send-message/plivo', () => {
    it('performs correctly', async () => {
        const client = new SuperfaceClient;
        const profile = await client.getProfile('communication/send-message');
        const useCase = profile.getUseCase('sendMessage');
        const provider = await client.getProvider('plivo');

        expect(useCase).not.toBeUndefined()
        expect(provider).not.toBeUndefined()
        //Edit expected value
        //await expect(useCase.perform({}, { provider })).resolves.toEqual()
    })
})
