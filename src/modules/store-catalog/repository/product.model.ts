import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  public declare id: string;

  @Column({ allowNull: false })
  public declare name: string;

  @Column({ allowNull: false })
  public declare description: string;

  @Column({ allowNull: false })
  public declare salesPrice: number;
}
