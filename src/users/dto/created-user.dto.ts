import {
  IsNotEmpty,
  MinLength,
  IsString,
  isNotEmpty,
  IsEmpty,
  IsIn,
  IsEmail,
} from 'class-validator';

export class Userdto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly age: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['Male', 'Female'], {
    message: 'Gender should be Male, Female',
  })
  readonly gender: string;
}
