import {Test, TestingModule} from '@nestjs/testing'
import {PasswordService} from '../services/password/password.service'
import {PrismaService} from '../services/prisma/prisma.service'
import {UsersController} from './users.controller'
import {UsersService} from './users.service'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PasswordService, PrismaService],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
