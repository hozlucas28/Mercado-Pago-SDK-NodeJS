import updateReleaseDate from '.';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing advancedPayment, updateReleaseDate', () => {
	test('should make a POST request to /v1/advanced_payments/:id/disburses with release date', async () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const releaseDate = '2022-07-01T00:00:00.000-04:00';
		const spyFetch = jest.spyOn(RestClient, 'fetch');
		await updateReleaseDate({ id: '123', releaseDate, config: client });
		expect(spyFetch).toHaveBeenCalledWith(
			'/v1/advanced_payments/123/disburses',
			expect.objectContaining({
				method: 'POST',
				headers: { 'Authorization': 'Bearer token' },
				body: JSON.stringify({ money_release_date: releaseDate })
			})
		);
	});
});
