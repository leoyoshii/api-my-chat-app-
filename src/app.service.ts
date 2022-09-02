import {Injectable} from '@nestjs/common'
import {Users} from '@prisma/client'
import {PrismaService} from './services/prisma/prisma.service'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<Users[]> {
    return await this.prisma.users.findMany()
  }
}
