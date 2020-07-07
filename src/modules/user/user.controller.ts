import { Controller, Param, Get, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { Roles } from '../role/decorator/role.decorator';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ){}

    @Get(':userId')
    /* @Roles(RoleType.ADMINISTRATOR)
    @UseGuards(AuthGuard(), RoleGuard) */
    getUser(@Param('userId', ParseIntPipe) userId:number): Promise<ReadUserDto>{
        return this._userService.get(userId)
    }

    @Get()
    getUsers(): Promise<ReadUserDto[]>{
        return this._userService.getAll()
    }

    @Patch(':userId')
    updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() user: UpdateUserDto){
        return this._userService.update(userId, user)
    }
    
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this._userService.delete(id)
    }

    @Post('setRole/:userId/:roleId')
    setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('roleId', ParseIntPipe) roleId: number
    ): Promise<boolean>{
        return this._userService.setRoleToUser(userId, roleId)
    }
}
