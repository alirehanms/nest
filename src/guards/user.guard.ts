import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  public role: string = 'admin';
  public name: string = 'Rehan';
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    if (
      request.header('role') == undefined ||
      request.header('name') == undefined
    )
      return false;
    return (
      request.header('role') === this.role &&
      request.header('name') === this.name
    );
  }
}
