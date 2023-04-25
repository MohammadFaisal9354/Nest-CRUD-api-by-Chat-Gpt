import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Product[]> {
    try {
      const products = await this.productService.findAll({
        page: Number(page),
        limit: Number(limit),
      });
      return products;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Product> {
    try {
      const product = await this.productService.findById(id);
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post()
  async create(@Body() productDto: CreateProductDto): Promise<Product> {
    try {
      return this.productService.create(productDto);
    } catch (err) {
      console.log(err);
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, productDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
