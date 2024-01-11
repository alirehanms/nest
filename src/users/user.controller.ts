import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
  UseFilters,
  Query,
} from '@nestjs/common';
import { UserService } from "./user.service";
import { User } from "./schemas/user.schema";
import { Userdto } from "./dto/created-user.dto";
import { Userupdatedto } from "./dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";

import { JwtStrategy } from "./auth/jwt.stratergy";
import { IdExceptionFilter } from "src/exceptions/id-exception.filter"; 
import { Query as ExpressQuery } from 'express-serve-static-core';
@Controller('userss')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get()
  // @UseGuards(AuthGuard())
  // async findAll(): Promise<User[]> {
  //   return this.userService.findAll();
  // }
  // @Post()
  // async create(
  //   @Body()
  //   user:Userdto,
  // ): Promise<User> {
  //   return this.userService.create(user);
  // }
  @Get(':id')
  @UseFilters(IdExceptionFilter)
  async findById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.findById(id);
  }
  @Put(':id')
  async updateById(
    @Param('id')
    id: string,
    @Body()
    user: Userupdatedto,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }
  @Delete(':id')
  // @UseFilters(IdExceptionFilter)
  async deleteById(
    @Param('id')
    id: string,
  ): Promise<{ message: string }> {
    return this.userService.deleteById(id);
  }

  @Get()
  async getAllUsers(@Query() query: ExpressQuery): Promise<User[]> {
    return this.userService.getAllUsers(query);
  }
}