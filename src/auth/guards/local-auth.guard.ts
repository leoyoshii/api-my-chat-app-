import {ExecutionContext, Injectable} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    console.log('entrou no can active')
    const result = (await super.canActivate(context)) as boolean

    const request = context.switchToHttp().getRequest()

    await super.logIn(request)

    return result
  }
}
