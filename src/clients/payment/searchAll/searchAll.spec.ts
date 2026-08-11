import { Payment } from '@src/clients/payment';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing payment, searchAll', () => {
	test('should return an AsyncIterable when searchAll is called', () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const payment = new Payment(client);
		const result = payment.searchAll();
		expect(result).toBeDefined();
		expect(typeof result[Symbol.asyncIterator]).toBe('function');
	});

	test('should call RestClient.fetch when iterating searchAll', async () => {
		const mockResponse = {
			paging: { total: 1, limit: 30, offset: 0 },
			results: [{ id: 123, status: 'approved' }]
		};
		(RestClient.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const payment = new Payment(client);
		const results: unknown[] = [];
		for await (const item of payment.searchAll()) {
			results.push(item);
		}
		expect(RestClient.fetch).toHaveBeenCalled();
	});
});
