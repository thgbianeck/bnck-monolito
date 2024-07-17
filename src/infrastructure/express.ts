import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { ClientModel } from '../modules/client-adm/repository/client.model';
import { InvoiceModel } from '../modules/invoice/repository/invoice.model';
import { InvoiceItemModel } from '../modules/invoice/repository/item.model';
import TransactionModel from '../modules/payment/repository/transaction.model';
import { ProductModel } from '../modules/product-adm/repository/product.model';
import { checkoutRoute } from './api/routes/checkout.route';
import { clientRoute } from './api/routes/client.route';
import { invoiceRoute } from './api/routes/invoice.route';
import { productRoute } from './api/routes/product.route';

export const app: Express = express();
app.use(express.json());
app.use('/client', clientRoute);
app.use('/product', productRoute);
app.use('/invoice', invoiceRoute);
app.use('/checkout', checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  sequelize.addModels([
    ClientModel,
    ProductModel,
    TransactionModel,
    InvoiceModel,
    InvoiceItemModel,
  ]);
  await sequelize.sync();
}
setupDb();
