import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreRepository, ProductRepository]),
    AuthModule,
  ],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
