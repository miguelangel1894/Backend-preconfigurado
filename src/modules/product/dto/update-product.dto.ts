import { IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  productName: string;

  @IsString()
  description: string;

  @IsString()
  productImg: string;

  @IsString()
  price: number;

  @IsString()
  category: string;

  @IsString()
  promo: string;
}
