import { Controller, Param, Get, Post, Body, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { ReadRoleDto, UpdateRoleDto } from './dtos';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly _roleService: RoleService
    ){}

    @Get(':roleId')
    getRole(@Param('roleId', ParseIntPipe) roleId:number): Promise<ReadRoleDto>{
        return this._roleService.get(roleId)
    }

    @Get()
    getRoles(): Promise<ReadRoleDto[]>{
        return this._roleService.getAll()
    }

    @Post()
    createRole(@Body() role: Role): Promise <ReadRoleDto>{
        return this._roleService.create(role)
    }

    @Patch(':roleId')
    updateRole(@Param('roleId', ParseIntPipe) roleId: number, @Body() role: Partial<UpdateRoleDto>){
        return this._roleService.update(roleId, role)
 
    }
    
    @Delete(':roleId')
    deleteRole(@Param('roleId', ParseIntPipe) roleId: number){
        return this._roleService.delete(roleId)
    }
}
