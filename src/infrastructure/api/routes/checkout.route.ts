import express, { Request, Response } from 'express';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/facade.factory';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory';
import StoreCatalogFacadeFactory from '../../../modules/store-catalog/factory/facade.factory';
import InvoiceFacadeFactory from '../../../modules/invoice/factory/invoice.facade.factory';
import PaymentFacadeFactory from '../../../modules/payment/factory/payment.facade.factory';
import PlaceOrderUseCase from '../../../modules/checkout/usecase/place-order/place-order.usecase';

export const checkoutRoute = express.Router();

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productFacade = ProductAdmFacadeFactory.create();
  const catalogFacade = StoreCatalogFacadeFactory.create();
  const invoiceFacade = InvoiceFacadeFactory.create();
  const paymentFacade = PaymentFacadeFactory.create();
  const mockCheckoutRepository = {
    addOrder: jest.fn(),
    findOrder: jest.fn(),
  };

  const usecase = new PlaceOrderUseCase(
    clientFacade,
    productFacade,
    catalogFacade,
    mockCheckoutRepository,
    invoiceFacade,
    paymentFacade
  );

  try {
    const checkoutDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    };

    const output = await usecase.execute(checkoutDto);
    res.send(output);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err);
    }
  }
});
