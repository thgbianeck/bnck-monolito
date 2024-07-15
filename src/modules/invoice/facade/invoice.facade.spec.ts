import { Sequelize } from 'sequelize-typescript';
import Address from '../../@shared/domain/value-object/address';
import Id from '../../@shared/domain/value-object/id.value-object';
import InvoiceItems from '../domain/invoice-item.entity';
import InvoiceFacadeFactory from '../factory/invoice.facade.factory';
import { InvoiceItemsModel } from '../repository/invoice-items.model';
import { InvoiceModel } from '../repository/invoice.model';

describe('Invoice Facade test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      id: '1',
      name: 'test invoice',
      document: '1234567890',
      address: new Address(
        'Rua 123',
        '99',
        'apto 10',
        'Cidade Teste',
        'SP',
        '12345-678'
      ),
      items: [
        new InvoiceItems({
          id: new Id('1'),
          name: 'Item 1',
          price: 100,
        }),
        new InvoiceItems({
          id: new Id('2'),
          name: 'Item 2',
          price: 200,
        }),
      ],
    };

    await invoiceFacade.generate(input);

    const result = await invoiceFacade.find({ id: '1' });

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.address).toEqual(input.address);
    expect(result.items[0].id).toEqual(input.items[0].id.id);
    expect(result.items[0].name).toEqual(input.items[0].name);
    expect(result.items[0].price).toEqual(input.items[0].price);
    expect(result.items[1].id).toEqual(input.items[1].id.id);
    expect(result.items[1].name).toEqual(input.items[1].name);
    expect(result.items[1].price).toEqual(input.items[1].price);
    expect(result.items).toHaveLength(2);
    expect(result.total).toEqual(300);
  });
});
