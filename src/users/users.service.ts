import {Injectable} from '@nestjs/common'
import {Users} from '@prisma/client'
import * as bcrypt from 'bcrypt'

import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {PrismaService} from '../services/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create({password, confirmPassword, ...rest}: CreateUserDto): Promise<Users> {
    if (password !== confirmPassword) {
      throw new Error('password and confirmPassword is not the same')
    }

    const genSalt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, genSalt)

    return this.prisma.users.create({data: {password: hashedPassword, ...rest}})
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
