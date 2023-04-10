import {
  Controller,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuar)
  login(@Req() req: AuthRequest) {
    return this.authService.login(req.user)
  }
}
