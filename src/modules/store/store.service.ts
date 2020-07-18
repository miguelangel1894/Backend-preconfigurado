import { StoreRepository } from './store.repository';
import { ProductRepository } from '../product/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadStoreDto, UpdateStoreDto } from './dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { status } from '../../shared/entity-status.num';
import { plainToClass } from 'class-transformer';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';

export class StoreService {
  constructor(
    @InjectRepository(StoreRepository)
    private readonly _storeRepository: StoreRepository,
    @InjectRepository(ProductRepository)
    private readonly _productRepository: ProductRepository,
  ) {}

  /* ------------------------------------------------------------------------------------- */

  async getStore(storeId: number): Promise<ReadStoreDto> {
    if (!storeId) {
      throw new BadRequestException(
        'El id del establecimiento no ha sido enviado',
      );
    }

    const store = await this._storeRepository.findOne(storeId, {
      where: { status: status.ACTIVE },
    });

    if (!store) {
      throw new NotFoundException();
    }

    return plainToClass(ReadStoreDto, store);
  }

  /* -------------------------------------------------------------------------------------- */

  async getAllStore(): Promise<ReadStoreDto[]> {
    const store: Store[] = await this._storeRepository.find({
      where: { status: status.ACTIVE },
    });

    return store.map((store: Store) => plainToClass(ReadStoreDto, store));
  }

  /* -------------------------------------------------------------------------------------- */

  async createStore(store: Partial<CreateStoreDto>): Promise<ReadStoreDto> {
    const savedStore: Store = await this._storeRepository.save(store);
    return plainToClass(ReadStoreDto, savedStore);
  }

  /* -------------------------------------------------------------------------------------- */

  async updateStore(
    storeId: number,
    store: UpdateStoreDto,
  ): Promise<ReadStoreDto> {
    const foundStore = await this._storeRepository.findOne(storeId, {
      where: { status: 'ACTIVE' },
    });

    if (!foundStore) {
      throw new NotFoundException('El establecimiento no existe');
    }

    foundStore.storeName = store.storeName;
    foundStore.description = store.description;
    foundStore.schedule = store.schedule;
    foundStore.profile = store.profile;
    foundStore.deliveryHours = store.deliveryHours;

    const updateStore = await this._storeRepository.save(foundStore);

    return plainToClass(ReadStoreDto, updateStore);
  }

  /* ------------------------------------------------------------------------------------- */

  async deleteStore(storeId: number): Promise<void> {
    const storeExist = await this._storeRepository.findOne(storeId, {
      where: { status: status.ACTIVE },
    });

    if (!storeExist) {
      throw new NotFoundException();
    }

    await this._storeRepository.update(storeExist, { status: 'INACTIVE' });
  }

  /* ------------------------------------------------------------------------------------ */

  async setProductToStore(
    storeId: number,
    productId: number,
  ): Promise<boolean> {
    const storeExist = await this._storeRepository.findOne(storeId, {
      where: { status: status.ACTIVE },
    });

    if (!storeExist) {
      throw new NotFoundException('!Ops la tienda no fue encontrada');
    }

    const productExist = await this._productRepository.findOne(productId, {
      where: { status: status.ACTIVE },
    });

    if (!productExist) {
      throw new NotFoundException('Ops el producto no existe.');
    }

    storeExist.product.push(productExist);
    await this._productRepository.save(storeExist);

    return true;
  }

  /* ------------------------------------------------------------------------------------ */
}
