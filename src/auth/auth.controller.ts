import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto) {
    return this.authService.validateUser(data);
  }
}

