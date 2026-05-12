import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseEnumPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import { RoleEnum } from './enums/roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
    @ApiQuery({name: 'role', type: 'string', required: false})
    @ApiQuery({name: 'limit', type: 'string', required: false})
    @ApiQuery({name: 'page', type: 'string', required:false})
  findAll(
    @Query('role', new ParseEnumPipe(RoleEnum, { optional: true })) role?: RoleEnum, 
    @Query('page') page?: string, 
    @Query('limit') limit?: string) {
    const pageNum = Number(page)
    const limitNum = Number(limit)

    const validPage = !isNaN(pageNum) && pageNum > 0 ? pageNum : 1
    const validLimit = !isNaN(limitNum) && limitNum > 0 ? limitNum : 5

    return this.usersService.findAll(role, validPage, validLimit);
  }

  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.usersService.findByDni(dni);
  }

  @ApiParam({ name: 'id', type: 'string', required: true })
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto) {
    const userUpdate = await this.usersService.update(id, updateUserDto);

    return{
      message: `Usuario ${userUpdate.first_name} modificado correctamente.`,
      data: userUpdate
    }
  }

  @ApiParam({name: 'id', type: 'string', required: true})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id)
    return {
      message: `Usuario ${user.first_name} eliminado correctamente.`
    }
  }
}
