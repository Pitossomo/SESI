import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuar } from './guards/local-auth.guard'
import { AuthRequest } from './models/auth-request'
import { IsPublic } from './decorators/is-public.decorator'
import { CurrentUser } from './decorators/current-user.decorator'
import { PartialUser } from 'src/modules/users/entities/user.entity'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuar)
  login(@Req() req: AuthRequest) {
    return this.authService.login(req.user)
  }

  @Get('me')
  getMe(@CurrentUser() user: PartialUser) {
    return user
  }
}
