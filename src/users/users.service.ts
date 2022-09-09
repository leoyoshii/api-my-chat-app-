import {Injectable} from '@nestjs/common'
import {Users} from '@prisma/client'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {PrismaService} from '../services/prisma/prisma.service'
import {PasswordService} from '../services/password/password.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private passwordService: PasswordService) {}
  async create({password, confirmPassword, ...rest}: CreateUserDto): Promise<Users> {
    if (password !== confirmPassword) {
      throw new Error('password and confirmPassword is not the same')
    }

    const hashedPassword = await this.passwordService.hashPassword(password)

    return this.prisma.users.create({data: {password: hashedPassword, ...rest}})
  }

  async findAll() {
    return this.prisma.users.findMany()
  }

  async findOne(id: string) {
    return this.prisma.users.findUnique({where: {id}})
  }

  async update(id: string, data: UpdateUserDto) {
    return this.prisma.users.update({
      where: {id},
      data,
    })
  }

  async remove(id: string) {
    const user = await this.prisma.users.findUnique({where: {id}})

    user.deletedAt ? (user.deletedAt = null) : (user.deletedAt = new Date())

    //TODO: implement Soft delete index in DB and Prisma Middleware
    return this.prisma.users.update({
      where: {id},
      data: user,
    })
  }
}
