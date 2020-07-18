import { IsNotEmpty } from 'class-validator';

export class StoreDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  storeName: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  schedule: string;

  @IsNotEmpty()
  profile: string;

  @IsNotEmpty()
  stars: number;

  @IsNotEmpty()
  deliveryHours: string;

  @IsNotEmpty()
  status: string;

  /* @IsNotEmpty()
    products: Products[] */
}
