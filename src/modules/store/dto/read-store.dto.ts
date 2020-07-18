import { Type, Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class ReadStoreDto {

    @Expose()
    @IsNumber()
    readonly id: number

    @Expose()
    @IsString()
    readonly storeName: string

    @Expose()
    @IsString()
    readonly description: string
    
    @Expose()
    @IsString()
    readonly schedule: string

    @Expose()
    @IsString()
    readonly profile: string

    @Expose()
    @IsNumber()
    readonly stars: number
    
    @Expose()
    @IsString()
    readonly deliveryHours: string

    @Expose()
    @IsString()
    readonly status: string
/* 
    @Expose()
    @Type( type => ReadProductDto)
    readonly roles: ReadProductDto[] */
}