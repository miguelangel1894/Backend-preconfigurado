import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'El nombre del producto no es valido' })
  productName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message:
      'La descripción de tu producto debe ser corta maximo 150 carácteres',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  productImg: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(3, {
    message: 'La promo solo admite si o no',
  })
  promo: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
