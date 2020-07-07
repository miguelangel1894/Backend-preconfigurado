import { Controller, Param, Get, Post, Body, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../role/guards/role.guard';
import { Roles } from '../role/decorator/role.decorator';
import { RoleType } from '../role/roletype.enum';

@Controller('users')
export class UserController {
    constructor(
        private readonly _userService: UserService
    ){}

    @Get(':id')
    /* @Roles(RoleType.ADMINISTRATOR)
    @UseGuards(AuthGuard(), RoleGuard) */
    async getUser(@Param('id', ParseIntPipe) id:number): Promise<User>{
        const user = await this._userService.get(id)
        return user
    }

    @Get()
    async getUsers(): Promise<User[]>{
        const users = await this._userService.getAll()
        return users
    }

    @Post('create')
    async createUser(@Body() user: User): Promise <User>{
        const createdUser = await this._userService.create(user)
        return createdUser
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User){
        const updateUser = await this._userService.update(id, user)
        return true
    }
    
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        await this._userService.delete(id)
        return true
    }

    @Post('setRole/:userId/:roleId')
    async setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number,
        @Param('roleId', ParseIntPipe) roleId: number
    ){
        return this._userService.setRoleToUser(userId, roleId)
    }
}
