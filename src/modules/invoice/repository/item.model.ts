import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'invoices_items',
  timestamps: false,
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  public declare id: string;

  @ForeignKey(() => require('./invoice.model').InvoiceModel)
  @Column({ allowNull: false })
  public declare invoice_id: string;

  @BelongsTo(() => require('./invoice.model').InvoiceModel)
  public declare invoice: ReturnType<typeof require>;

  @Column({ allowNull: false })
  public declare name: string;

  @Column({ allowNull: false })
  public declare price: number;
}
