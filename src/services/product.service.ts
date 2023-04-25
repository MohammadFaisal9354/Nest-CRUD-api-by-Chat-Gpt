import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {
    console.log('Product Service Triggered');
  }

  async findAll(options: { page: number; limit: number }): Promise<Product[]> {
    const { page, limit } = options;
    const offset = (page - 1) * limit;
    const products = await this.productModel.findAll({ limit, offset });
    return products;
  }

  async findById(id: number): Promise<Product> {
    try {
      return this.productModel.findByPk(id);
    } catch (err) {
      console.log(err);
    }
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(productDto);
  }

  async update(id: number, productDto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    return product.update(productDto);
  }

  async delete(id: number): Promise<void> {
    const product = await this.productModel.findByPk(id);
    await product.destroy();
  }
}
