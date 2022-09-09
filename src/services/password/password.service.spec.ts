import {Test, TestingModule} from '@nestjs/testing'
import {PasswordService} from './password.service'
import {faker} from '@faker-js/faker'
import * as bcrypt from 'bcrypt'

describe('PasswordService', () => {
  let service: PasswordService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile()

    service = module.get<PasswordService>(PasswordService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should hash Password', async () => {
    const password = faker.internet.password()
    const word = faker.random.word()

    const spiedBcryptHashMethod = jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve(password))

    const hashedPassword = await service.hashPassword(word)

    expect(spiedBcryptHashMethod).toBeCalled()
    expect(hashedPassword).toBe(password)
  })

  it('should compare Password', async () => {
    const word = faker.random.word()

    const hashedPassword = await service.hashPassword(word)

    const spiedBcryptHashMethod = jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true))

    const compared = await service.validatePassword(word, hashedPassword)

    expect(spiedBcryptHashMethod).toBeCalled()
    expect(compared).toBeTruthy()
  })
})
