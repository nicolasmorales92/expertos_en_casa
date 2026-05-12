import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, CreateUserProfessionalDto } from './dto´s/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserProfessionalDto) {
    return await this.authService.create(createUserDto);
  }

}
