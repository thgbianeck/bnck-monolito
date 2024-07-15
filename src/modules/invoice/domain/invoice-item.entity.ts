import Id from '../../@shared/domain/value-object/id.value-object';

type InvoiceItemsProps = {
  id?: Id;
  name: string;
  price: number;
};

export default class InvoiceItems {
  private _id?: Id;
  private _name: string;
  private _price: number;

  constructor(props: InvoiceItemsProps) {
    this._id = props.id || new Id();
    this._name = props.name;
    this._price = props.price;
  }

  get id(): Id {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  set id(id: Id) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set price(price: number) {
    this._price = price;
  }
}
