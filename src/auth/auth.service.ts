import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common'
import {PasswordService} from '../services/password/password.service'
import {UsersService} from '../users/users.service'
import {ValidateUserDto} from './dtos/validate-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(userDetails: ValidateUserDto) {
    const user = await this.usersService.findOneByEmail(userDetails.email)

    if (!user) {
      throw new UnauthorizedException()
    }

    const isPasswordValid = await this.passwordService.validatePassword(
      userDetails.password,
      user.password,
    )

    return isPasswordValid ? user : null
  }
}
