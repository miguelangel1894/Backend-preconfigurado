import { IsString } from 'class-validator';

export class UpdateStoreDto {
  @IsString()
  storeName: string;

  @IsString()
  description: string;

  @IsString()
  schedule: string;

  @IsString()
  profile: string;

  @IsString()
  deliveryHours: string;
}
