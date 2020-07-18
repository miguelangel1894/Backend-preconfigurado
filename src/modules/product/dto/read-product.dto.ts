import { Type, Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ReadProductDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly productName: string;

  @Expose()
  @IsString()
  readonly description: string;

  @Expose()
  @IsString()
  readonly productImg: string;

  @Expose()
  @IsNumber()
  readonly price: number;

  @Expose()
  @IsNumber()
  readonly stars: number;

  @Expose()
  @IsString()
  readonly category: string;

  @Expose()
  @IsString()
  readonly promo: string;
  /* 
    @Expose()
    @Type( type => ReadProductDto)
    readonly roles: ReadProductDto[] */
}
