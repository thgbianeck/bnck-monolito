import { Sequelize } from 'sequelize-typescript';
import Address from '../../@shared/domain/value-object/address';
import Id from '../../@shared/domain/value-object/id.value-object';
import InvoiceItems from '../domain/invoice-item.entity';
import Invoice from '../domain/invoice.entity';
import { InvoiceItemsModel } from './invoice-items.model';
import { InvoiceModel } from './invoice.model';
import InvoiceRepository from './invoice.repository';

describe('Invoice Repository test', () => {
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
    const invoice = await InvoiceModel.create({
      id: '1',
      name: 'John',
      document: '1234-5678',
      street: 'Rua 123',
      number: '99',
      complement: 'Casa Verde',
      city: 'Criciúma',
      state: 'SC',
      zipcode: '88888-888',
      createdAt: new Date(),
      updatedAt: new Date(),
      items: [
        { id: 1, name: 'Item 1', price: 100 },
        { id: 2, name: 'Item 2', price: 200 },
      ],
    });

    const invoiceRepository = new InvoiceRepository();
    const result = await invoiceRepository.find(invoice.id);

    console.log('result = ', result);

    expect(result.id.id).toEqual(invoice.id);
    expect(result.id).toEqual(invoice.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address.street).toEqual(invoice.street);
    expect(result.address.number).toEqual(invoice.number);
    expect(result.address.complement).toEqual(invoice.complement);
    expect(result.address.city).toEqual(invoice.city);
    expect(result.address.state).toEqual(invoice.state);
    expect(result.address.zipCode).toEqual(invoice.zipcode);
    expect(result.items.length).toEqual(invoice.items.length);
    expect(result.items[0].id).toEqual(invoice.items[0].id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.items[1].id).toEqual(invoice.items[1].id);
    expect(result.items[1].name).toEqual(invoice.items[1].name);
    expect(result.items[1].price).toEqual(invoice.items[1].price);
    expect(result.createdAt).toStrictEqual(invoice.createdAt);
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt);
  });

  it('should generate an invoice', async () => {
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

    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.add(invoice);

    const invoiceDb = await InvoiceModel.findOne({ where: { id: '123' } });

    expect(invoiceDb).toBeDefined();
    expect(invoiceDb.id).toEqual(invoice.id.id);
    expect(invoiceDb.name).toEqual(invoice.name);
    expect(invoiceDb.document).toEqual(invoice.document);
    expect(invoiceDb.street).toEqual(invoice.address.street);
    expect(invoiceDb.number).toEqual(invoice.address.number);
    expect(invoiceDb.complement).toEqual(invoice.address.complement);
    expect(invoiceDb.city).toEqual(invoice.address.city);
    expect(invoiceDb.state).toEqual(invoice.address.state);
    expect(invoiceDb.zipcode).toEqual(invoice.address.zipCode);
    expect(invoiceDb.items.length).toEqual(invoice.items.length);
    expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id.id);
    expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name);
    expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price);
    expect(invoiceDb.items[1].id).toEqual(invoice.items[1].id.id);
    expect(invoiceDb.items[1].name).toEqual(invoice.items[1].name);
    expect(invoiceDb.items[1].price).toEqual(invoice.items[1].price);
    expect(invoiceDb.createdAt).not.toBeNull();
    expect(invoiceDb.updatedAt).not.toBeNull();
  });
});
