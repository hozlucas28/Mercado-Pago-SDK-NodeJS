import cancel from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing advancedPayment, cancel', () => {
	test('should make a PUT request to /v1/advanced_payments/:id with cancelled status', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await cancel({ id: '123', config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments/123',
			expect.objectContaining({
				method: 'PUT',
				headers: { 'Authorization': 'Bearer token' },
				body: JSON.stringify({ status: 'cancelled' })
			})
		);
	});
});
