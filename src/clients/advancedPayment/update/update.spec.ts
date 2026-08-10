import update from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing advancedPayment, update', () => {
	test('should make a PUT request to /v1/advanced_payments/:id with body', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const body = { capture: true };
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await update({ id: '123', body, config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments/123',
			expect.objectContaining({
				method: 'PUT',
				headers: { 'Authorization': 'Bearer token' },
				body: JSON.stringify(body)
			})
		);
	});
});
