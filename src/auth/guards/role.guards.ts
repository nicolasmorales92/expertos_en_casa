import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleEnum } from "../../users/enums/roles";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<RoleEnum[]>('roles', [
      context.getHandler(),
      context.getClass() 
    ])

    const request = context.switchToHttp().getRequest()
    const user = request.user

    const validRole = ()=> requiredRole.some((role) => user.roles.includes(role))

    if(!validRole()) {throw new UnauthorizedException('No tienes permiso para acceder a esta ruta')}
    return true
  }
}