import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do cabeçalho Authorization
      secretOrKey: jwtConstants.secret, // Segredo para validar o token
    });
  }

  async validate(payload: any) {
    const user = await this.usuarioService.findOne(payload.sub); // Aqui payload.sub é o ID do usuário
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return { userId: payload.sub, username: payload.username }; // Retorna o usuário
  }
}
