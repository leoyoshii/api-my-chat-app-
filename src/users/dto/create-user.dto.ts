import {IsEmail, IsNotEmpty, MaxLength, MinLength} from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  firstName: string

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  confirmPassword: string
}
