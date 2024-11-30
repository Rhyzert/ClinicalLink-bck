import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usuarioService.findByEmail(email);
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
  
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
  

    const payload = { sub: user.id, username: user.nome }; // Apenas os dados necessários
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(userId: string): Promise<any> {
    const user = await this.usuarioService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Token inválido ou usuário não encontrado');
    }
    return user;
  }
}