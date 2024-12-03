import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { DetalhesProfissionaisService } from 'src/detalhes-profissionais/detalhes-profissionais.service';
import { TipoUsuario } from 'src/enums/tipo-usuario.enum';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly detalhesProfissionaisService: DetalhesProfissionaisService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const user = this.usuarioRepository.create(createUsuarioDto);

    if (createUsuarioDto.detalhesProfissionais) {
      await this.detalhesProfissionaisService.create(
        createUsuarioDto.detalhesProfissionais,
      );
    }

    return this.usuarioRepository.save(user);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: string) {
    return this.usuarioRepository.findOne({ where: { id: id.toString() } });
  }

  findByEmail(email: string) {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  findByTipo(tipoUsuario: TipoUsuario) {
    return this.usuarioRepository.find({ where: { tipoUsuario } });
  }

  findByNome(nomeCompleto: string) {
    const [nome, ...resto] = nomeCompleto.split(' ');
    const sobrenome = resto.join(' ');

    return this.usuarioRepository.findOne({
      where: {
        nome,
        sobrenome,
      },
    });
  }

  async findAllProfissionais() {
    const profissionais = await this.usuarioRepository.find({
      where: [
        { tipoUsuario: TipoUsuario.PSICOLOGO },
        { tipoUsuario: TipoUsuario.ESTAGIARIO },
      ],
      relations: ['detalhesProfissionais', 'consultas'],
    });

    profissionais.forEach((x) => {
      x.agenda = [
        {
          data: '2024-12-03',
          horas: ['08:00', '09:00', '10:00', '14:00'],
        },
        {
          data: '2024-12-04',
          horas: ['09:00', '11:00', '15:00', '16:00'],
        },
      ];
    });

    return profissionais;
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.update(id, updateUsuarioDto);
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
