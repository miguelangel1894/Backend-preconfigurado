import {
  ParseIntPipe,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { ReadStoreDto, UpdateStoreDto } from './dto';
import { Store } from './store.entity';
import { Roles } from '../role/decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';

@Controller('store')
export class StoreController {
  constructor(private readonly _storeService: StoreService) {}

  @Get(':storeId')
  getStore(
    @Param('storeId', ParseIntPipe) storeId: number,
  ): Promise<ReadStoreDto> {
    return this._storeService.getStore(storeId);
  }

  @Get()
  getStores(): Promise<ReadStoreDto[]> {
    return this._storeService.getAllStore();
  }

  @Post()
  createStore(@Body() store: Store): Promise<ReadStoreDto> {
    return this._storeService.createStore(store);
  }

  @Patch(':storeId')
  updateStore(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() store: UpdateStoreDto,
  ) {
    return this._storeService.updateStore(storeId, store);
  }

  @Delete(':storeId')
  deleteStore(@Param('storeId', ParseIntPipe) storeId: number) {
    return this._storeService.deleteStore(storeId);
  }

  @Post('setProduct/:storeId/:productId')
  setProductToStore(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<boolean> {
    return this._storeService.setProductToStore(storeId, productId);
  }
}
