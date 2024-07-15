import Address from '../../@shared/domain/value-object/address';
import InvoiceItems from '../domain/invoice-item.entity';

export interface FindInvoiceFacadeInputDto {
  id: string;
}

export interface FindInvoiceFacadeOutputDto {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerateInvoiceFacadeInputDto {
  id?: string;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
}

export default interface InvoiceFacadeInterface {
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
  generate(input: GenerateInvoiceFacadeInputDto): Promise<void>;
}
