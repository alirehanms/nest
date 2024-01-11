import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { Query } from 'express-serve-static-core';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    public userModel: mongoose.Model<User>,
  ) {}
  // async findAll(): Promise<User[]> {
  //   const books = await this.userModel.find();
  //   return books;
  // }

  // async create(user: User): Promise<User> {
  //   const res = await this.userModel.create(user);
  //   return res;
  // }
  async findById(id: string): Promise<User> {
    const validid = mongoose.isValidObjectId(id);
    if (!validid) {
      throw new BadRequestException('Invalid id');
    }
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Book not found.');
    }

    return user;
  }

  async updateById(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<{ message: string }> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      // Handle the case where the user with the specified ID is not found
      throw new NotFoundException('User not  found with this id');
    }
    return { message: 'User deleted successfully' };
    //Search
  }

  async getAllUsers(query: Query): Promise<User[]> {
    const name = query.name
      ? {
          name: {
            $regex: query.name,
            $options: 'i',
          },
        }
      : {};
    const user = await this.userModel.find({ ...name });
    return user;
  }
}
