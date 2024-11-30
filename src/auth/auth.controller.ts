import { Response as ExpressResponse } from 'express';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn-dto.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';

@Controller('authenticate')
@ApiTags('authenticate')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() signInDto: SignInDto, @Response() res: ExpressResponse) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    res.setHeader('Authorization', `Bearer ${token}`).json(token);
    res.send();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@User() user: any) {
    return user;
  }
}
