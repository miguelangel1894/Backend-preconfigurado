import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ReadProductDto, UpdateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Get(':productId')
  getProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<ReadProductDto> {
    return this._productService.getProduct(productId);
  }

  @Get()
  getProducts(): Promise<ReadProductDto[]> {
    return this._productService.getAllProducts();
  }

  @Post()
  createProduct(@Body() product: Product): Promise<ReadProductDto> {
    return this._productService.createProduct(product);
  }

  @Patch(':productId')
  updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() product: UpdateProductDto,
  ) {
    return this._productService.updateProduct(productId, product);
  }

  @Delete(':productId')
  deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this._productService.deleteProduct(productId);
  }
}
