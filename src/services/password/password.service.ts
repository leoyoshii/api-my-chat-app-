import {Injectable} from '@nestjs/common'
import {hash, compare, genSalt} from 'bcrypt'

@Injectable()
export class PasswordService {
  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await compare(password, hashedPassword)
  }

  async hashPassword(password: string): Promise<string> {
    const salts = await genSalt()
    return hash(password, salts)
  }
}
