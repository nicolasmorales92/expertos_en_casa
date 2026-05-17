import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedException('Token no encontrado en los headers');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      if(payload.role) {
        payload.roles = [payload.role]
      }
      else{
        payload.roles = ['Client']
      }

        request.user = payload


    } 
    catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
    return true;
  }
}

