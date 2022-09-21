import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {UsersModule} from '../users/users.module'
import {UsersService} from '../users/users.service'
import {PrismaService} from '../services/prisma/prisma.service'
import {PasswordService} from '../services/password/password.service'
import {LocalStrategy} from './strategies/local.strategy'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {jwtConstants} from './auth.constant'
import {JwtStrategy} from './strategies/jwt.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '3h'},
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    PasswordService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
