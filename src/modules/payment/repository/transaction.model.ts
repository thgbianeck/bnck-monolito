import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'transactions',
  timestamps: false,
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  public declare id: string;

  @Column({ allowNull: false, field: 'order_id' })
  public declare orderId: string;

  @Column({ allowNull: false })
  public declare amount: number;

  @Column({ allowNull: false })
  public declare status: string;

  @Column({ allowNull: false, field: 'created_at' })
  public declare createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  public declare updatedAt: Date;
}
