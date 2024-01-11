import { Body, Controller, Get, Post,UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../schemas/user.schema';
import { Userdto } from '../dto/created-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/user.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @Post('/signup')
  //   signUp(@Body() signUpDto: SignUpDto): Promise<{ user: User }> {
  //     return this.authService.signUp(signUpDto);
  //   }
  @Post()
  // @UseGuards(new RolesGuard())
  create(
    @Body()
    user: Userdto,
  ): Promise<{ user: User }> {
    return this.authService.create(user);
  }
  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
