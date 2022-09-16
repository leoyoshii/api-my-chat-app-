import {IsEmail, IsNotEmpty} from 'class-validator'

export class ValidateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
