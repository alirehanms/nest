import {Prop ,Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Document } from "mongoose";
import { IsString, IsIn, MinLength } from 'class-validator';
@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;
  @Prop()
  @MinLength(6)
  password: string;
  @Prop()
  age: string;
  @Prop()
  @IsString()
  @IsIn(['Male', 'Female', 'Other'], {
    message: 'Gender should be Male, Female, or Other',
  })
  gender: string;
}
export const UserSchema = SchemaFactory.createForClass(User)