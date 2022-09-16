import {Module} from '@nestjs/common'
import {UsersService} from './users.service'
import {UsersController} from './users.controller'
import {PrismaModule} from '../services/prisma/prisma.module'
import {PasswordService} from '../services/password/password.service'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}
