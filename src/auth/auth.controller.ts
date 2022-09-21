import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common'
import {instanceToPlain} from 'class-transformer'
import {ROUTES} from '../app.constants'
import {CreateUserDto} from '../users/dto/create-user.dto'
import {UsersService} from '../users/users.service'
import {AuthService} from './auth.service'
import {LocalAuthGuard} from './guards/local-auth.guard'

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private readonly usersService: UsersService, private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return instanceToPlain(user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
