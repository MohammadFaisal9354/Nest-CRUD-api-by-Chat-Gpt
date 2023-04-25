import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  price: string;

  @Column
  quantity: number;
}
