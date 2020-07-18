import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto, ReadProductDto, CreateProductDto } from './dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { status } from '../../shared/entity-status.num';
import { plainToClass } from 'class-transformer';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';

export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}

  /* ------------------------------------------------------------------------------------- */

  async getProduct(productId: number): Promise<ReadProductDto> {
    if (!productId) {
      throw new BadRequestException('El id del producto no ha sido enviado');
    }

    const product = await this._productRepository.findOne(productId, {
      where: { status: status.ACTIVE },
    });

    if (!product) {
      throw new NotFoundException();
    }

    return plainToClass(ReadProductDto, product);
  }

  /* -------------------------------------------------------------------------------------- */

  async getAllProducts(): Promise<ReadProductDto[]> {
    const product: Product[] = await this._productRepository.find({
      where: { status: status.ACTIVE },
    });

    return product.map((product: Product) =>
      plainToClass(ReadProductDto, product),
    );
  }

  /* -------------------------------------------------------------------------------------- */

  async createProduct(
    product: Partial<CreateProductDto>,
  ): Promise<ReadProductDto> {
    const savedProduct: Product = await this._productRepository.save(product);
    return plainToClass(ReadProductDto, savedProduct);
  }

  /* -------------------------------------------------------------------------------------- */

  async updateProduct(
    productId: number,
    product: UpdateProductDto,
  ): Promise<ReadProductDto> {
    const foundProduct = await this._productRepository.findOne(productId, {
      where: { status: 'ACTIVE' },
    });

    if (!foundProduct) {
      throw new NotFoundException('El producto no existe en tu almacén');
    }

    foundProduct.productName = product.productName;
    foundProduct.description = product.description;
    foundProduct.productImg = product.productImg;
    foundProduct.price = product.price;
    foundProduct.category = product.category;
    foundProduct.promo = product.promo;

    const updateProduct = await this._productRepository.save(foundProduct);

    return plainToClass(ReadProductDto, updateProduct);
  }

  /* ------------------------------------------------------------------------------------- */

  async deleteProduct(productId: number): Promise<void> {
    const productExist = await this._productRepository.findOne(productId, {
      where: { status: status.ACTIVE },
    });

    if (!productExist) {
      throw new NotFoundException('El producto no existe en tu almacén');
    }

    await this._productRepository.update(productExist, { status: 'INACTIVE' });
  }

  /* ------------------------------------------------------------------------------------ */
}
