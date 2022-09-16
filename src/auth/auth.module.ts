import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {UsersModule} from '../users/users.module'
import {UsersService} from '../users/users.service'
import {PrismaService} from '../services/prisma/prisma.service'
import {PasswordService} from '../services/password/password.service'
import {LocalStrategy} from './strategies/local.strategy'
import {PassportModule} from '@nestjs/passport'

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, PasswordService, LocalStrategy],
})
export class AuthModule {}
