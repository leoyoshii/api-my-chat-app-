import {faker} from '@faker-js/faker'
import {Test, TestingModule} from '@nestjs/testing'
import {Users} from '@prisma/client'
import {PasswordService} from '../services/password/password.service'
import {PrismaService} from '../services/prisma/prisma.service'
import {CreateUserDto} from './dto/create-user.dto'

import {UsersService} from './users.service'

function createRandomUsers(lenght: number): Users[] {
  const usersArray: Users[] = []

  Array.from({length: lenght}).forEach(() => {
    const dateCreated = faker.date.recent()

    const userCreated: Users = {
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: dateCreated,
      updatedAt: dateCreated,
      deletedAt: null,
    }
    usersArray.push(userCreated)
  })

  return usersArray
}

const UsersDb = createRandomUsers(10)

const oneUser = UsersDb[0]

const db = {
  users: {
    findMany: jest.fn().mockResolvedValue(UsersDb),
    findUnique: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockImplementation(async args => {
      return Promise.resolve({...oneUser, ...args.data})
    }),
    update: jest.fn().mockImplementation(async args => {
      return Promise.resolve({...oneUser, ...args.data})
    }),
  },
}

describe('UsersService', () => {
  let service: UsersService
  let passwordService: PasswordService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {provide: PrismaService, useValue: db}, PasswordService],
    }).compile()

    service = module.get<UsersService>(UsersService)
    passwordService = module.get<PasswordService>(PasswordService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a User', async () => {
    const password = faker.internet.password()

    const user: CreateUserDto = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: password,
      confirmPassword: password,
    }

    jest.spyOn(passwordService, 'hashPassword').mockImplementation(() => Promise.resolve(password))

    const userCreated = await service.create(user)

    const {confirmPassword, ...userRest} = user

    expect(userCreated).toStrictEqual({...oneUser, ...userRest})
  })

  it('should try create a User but password and confirmPassword is not the same', async () => {
    const password = faker.internet.password()

    const user: CreateUserDto = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: password,
      confirmPassword: 'notPassword',
    }

    jest.spyOn(passwordService, 'hashPassword').mockImplementation(() => Promise.resolve(password))

    try {
      await service.create(user)
      expect('here').not.toBe('here')
    } catch (error) {
      expect(error.message).toContain('password and confirmPassword is not the same')
    }
  })

  it('should find All users', async () => {
    const users = await service.findAll()

    expect(users).toStrictEqual(UsersDb)
  })

  it('should find a user', async () => {
    const user = await service.findOne(oneUser.id)
    expect(user).toStrictEqual(oneUser)
  })

  it('should update a user', async () => {
    const fakerUpdatedFistname = faker.name.firstName()
    const fakerUpdatedLastName = faker.name.lastName()

    const user = await service.update(oneUser.id, {
      firstName: fakerUpdatedFistname,
      lastName: fakerUpdatedLastName,
    })

    const uptadedUser: Users = {
      ...oneUser,
      firstName: fakerUpdatedFistname,
      lastName: fakerUpdatedLastName,
    }

    expect(user).toStrictEqual(uptadedUser)
  })

  it('should soft delete a user', async () => {
    const user = await service.remove(oneUser.id)

    expect(user).toStrictEqual(oneUser)

    const user2 = await service.remove(oneUser.id)

    expect(user2).toStrictEqual(oneUser)
  })
})
