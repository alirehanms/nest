import { IsEmail, IsEmpty, IsOptional, IsString,IsIn } from 'class-validator';

export class Userupdatedto {
  @IsOptional()
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsString()
  readonly age: string;
  @IsOptional()
  @IsString()
  readonly email: string;
  @IsOptional()
  @IsString()
  readonly password: string;
  @IsOptional()
  @IsString()
  @IsIn(['Male', 'Female'], {
    message: 'Gender should be Male, Female',
  })
  readonly gender: string;
}
