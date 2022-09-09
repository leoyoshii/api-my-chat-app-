import {Injectable} from '@nestjs/common'
import {hash, compare, genSalt} from 'bcrypt'

@Injectable()
export class PasswordService {
  get bcryptSaltRounds(): Promise<string | number> {
    return genSalt()
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword)
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, await this.bcryptSaltRounds)
  }
}
