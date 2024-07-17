import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({
  tableName: 'clients',
  timestamps: false,
})
export class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  public declare id: string;

  @Column({ allowNull: false })
  public declare name: string;

  @Column({ allowNull: false })
  public declare email: string;

  @Column({ allowNull: false })
  public declare document: string;

  @Column({ allowNull: false })
  public declare street: string;

  @Column({ allowNull: false })
  public declare number: string;

  @Column({ allowNull: true })
  public declare complement: string;

  @Column({ allowNull: false })
  public declare city: string;

  @Column({ allowNull: false })
  public declare state: string;

  @Column({ allowNull: false })
  public declare zipCode: string;

  @Column({ allowNull: false })
  public declare createdAt: Date;

  @Column({ allowNull: false })
  public declare updatedAt: Date;
}
