import { IsNumber, IsEmail, IsString } from "class-validator";
import { Type, Exclude, Expose } from "class-transformer";
import { ReadUserDetailDto } from "./read-user-details.dto";
import { ReadRoleDto } from "src/modules/role/dtos";

@Exclude()
export class ReadUserDto {

    @Expose()
    @IsNumber()
    readonly id: number

    @Expose()
    @IsEmail()
    readonly email: string

    @Expose()
    @IsString()
    readonly username: string

    @Expose()
    @Type( type => ReadUserDetailDto)
    readonly details: ReadUserDetailDto

    @Expose()
    @Type( type => ReadRoleDto)
    readonly roles: ReadRoleDto[]
}