import {Test, TestingModule} from '@nestjs/testing'
import {PasswordService} from '../services/password/password.service'
import {PrismaService} from '../services/prisma/prisma.service'

import {UsersService} from './users.service'

describe('UsersService', () => {
  let service: UsersService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService, PasswordService],
    }).compile()

    service = module.get<UsersService>(UsersService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  //TODO: Create a mock of prisma.

  // it('should create a User', async () => {
  //   const password = faker.internet.password()

  //   const user: CreateUserDto = {
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     email: faker.internet.email(),
  //     password: password,
  //     confirmPassword: password,
  //   }

  //   const userCreated = await service.create(user)

  //   expect(userCreated).toBe(user)
  // })

  // it('should find All users', async () => {
  //   const users = await service.findAll()

  //   expect(users).toBe([])
  // })

  // it.todo('should find a user', () => {
  //   expect(service).toBeDefined()
  // })

  // it.todo('should update a user', () => {
  //   expect(service).toBeDefined()
  // })

  // it.todo('should soft delete a user', () => {
  //   expect(service).toBeDefined()
  // })
})
