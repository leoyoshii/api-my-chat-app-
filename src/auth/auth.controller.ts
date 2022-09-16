import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common'
import {instanceToPlain} from 'class-transformer'
import {ROUTES} from '../app.constants'
import {CreateUserDto} from '../users/dto/create-user.dto'
import {UsersService} from '../users/users.service'
import {LocalAuthGuard} from './guards/local-auth.guard'

@Controller(ROUTES.AUTH)
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    return instanceToPlain(user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user
  }
}
