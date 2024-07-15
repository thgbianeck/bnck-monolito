import Address from '../../../@shared/domain/value-object/address';
import Id from '../../../@shared/domain/value-object/id.value-object';
import InvoiceItems from '../../domain/invoice-item.entity';
import Invoice from '../../domain/invoice.entity';
import FindInvoiceUseCase from './find-invoice.usecase';

const invoice = new Invoice({
  id: new Id('123'),
  name: 'John Doe',
  document: '1234567890',
  address: new Address('123 Main St', '123', '', 'New York', 'NY', '10001'),
  items: [
    new InvoiceItems({
      id: new Id('1'),
      name: 'Bola',
      price: 100,
    }),
    new InvoiceItems({
      id: new Id('2'),
      name: 'Bola de Basquete',
      price: 200,
    }),
  ],
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe('Find Invoice use case unit test', () => {
  it('should find an invoice', async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: '123',
    };

    const result = await usecase.execute(input);
    console.log(result);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address).toEqual(invoice.address);
    expect(result.items[0].id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.items[1].id).toEqual(invoice.items[1].id.id);
    expect(result.items[1].name).toEqual(invoice.items[1].name);
    expect(result.items[1].price).toEqual(invoice.items[1].price);
    expect(result.items).toHaveLength(2);
    expect(result.total).toEqual(300);
    expect(result.createdAt).toEqual(invoice.createdAt);
  });
});
