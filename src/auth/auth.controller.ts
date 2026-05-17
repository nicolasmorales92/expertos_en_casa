import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, CreateUserProfessionalDto } from './dto´s/createUser.dto';
import { LoginDto } from './dto´s/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('singup')
  async create(@Body() createUserDto: CreateUserProfessionalDto) {
    return await this.authService.create(createUserDto);
  }


  @Post('signin')
  async loginUser(@Body() user: LoginDto){
    const keys = Object.keys(user)
    if(keys.length > 2) throw new BadRequestException('Campos inválidos.')
    
      return await this.authService.loginUser(user)
  }

}
