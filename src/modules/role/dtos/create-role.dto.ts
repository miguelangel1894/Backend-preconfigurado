import { IsString, MaxLength } from "class-validator";

 export class CreateRoleDto{

    @IsString()
    @MaxLength(50, {message: 'El nombre no es valido'})
    readonly name: string

    @IsString()
    @MaxLength(100, {message: 'La descripción no es valida'})
    readonly description: string
 }