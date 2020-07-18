import { IsNotEmpty, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, { message: 'El nombre no es valido' })
  storeName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'La descripción de tu tienda debe ser corta maximo 150 carácteres',
  })
  description: string;

  @IsNotEmpty()
  @IsString()
  schedule: string;

  @IsNotEmpty()
  @IsString()
  profile: string;

  @IsNotEmpty()
  @IsNumber()
  stars: number;

  @IsNotEmpty()
  deliveryHours: string;
}
