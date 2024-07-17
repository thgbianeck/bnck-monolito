import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'invoices',
  timestamps: false,
})
export class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  public declare id: string;

  @Column({ allowNull: false })
  public declare name: string;

  @Column({ allowNull: false })
  public declare document: string;

  @Column({ allowNull: false })
  public declare street: string;

  @Column({ allowNull: false })
  public declare number: string;

  @Column({ allowNull: false })
  public declare complement: string;

  @Column({ allowNull: false })
  public declare city: string;

  @Column({ allowNull: false })
  public declare state: string;

  @Column({ allowNull: false })
  public declare zipcode: string;

  @HasMany(() => require('./item.model').InvoiceItemModel)
  public declare items: ReturnType<typeof require>[];

  @Column({ allowNull: false })
  public declare total: number;

  @Column({ allowNull: false })
  public declare createdAt: Date;
}
