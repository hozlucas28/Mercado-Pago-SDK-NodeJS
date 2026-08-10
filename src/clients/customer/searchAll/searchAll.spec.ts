import { Customer } from '@src/clients/customer';
import { RestClient } from '@utils/restClient';
import { MercadoPagoConfig } from '@src/mercadoPagoConfig';

jest.mock('@utils/restClient');

describe('Testing customer, searchAll', () => {
	test('should return an AsyncIterable when searchAll is called', () => {
		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const customer = new Customer(client);
		const result = customer.searchAll();
		expect(result).toBeDefined();
		expect(typeof result[Symbol.asyncIterator]).toBe('function');
	});

	test('should call RestClient.fetch when iterating searchAll', async () => {
		const mockResponse = {
			paging: { total: 1, limit: 30, offset: 0 },
			results: [{ id: 'cust-123', email: 'test@test.com' }]
		};
		(RestClient.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

		const client = new MercadoPagoConfig({ accessToken: 'token' });
		const customer = new Customer(client);
		const results: unknown[] = [];
		for await (const item of customer.searchAll()) {
			results.push(item);
		}
		expect(RestClient.fetch).toHaveBeenCalled();
	});
});
