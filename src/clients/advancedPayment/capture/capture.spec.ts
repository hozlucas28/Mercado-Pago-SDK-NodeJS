import capture from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing advancedPayment, capture', () => {
	test('should make a PUT request to /v1/advanced_payments/:id with capture true', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await capture({ id: '123', config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments/123',
			expect.objectContaining({
				method: 'PUT',
				headers: { 'Authorization': 'Bearer token' },
				body: JSON.stringify({ capture: true })
			})
		);
	});
});
