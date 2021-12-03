import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from '../../../shared/errors/AppError';
import { Player } from '../infra/typeorm/entities/Player';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

@Injectable()
export class UpdateUserWardobreService {
  constructor(
    @InjectRepository(Player)
    private userRepository: UserRepository,
  ) {}

  public async execute(
    matricula: string,
    idFeet: string,
    idLowerBody: string,
    idUpperBody: string,
  ): Promise<boolean | AppError> {
    if (!idFeet || !idLowerBody || !idUpperBody || !matricula) {
      return new AppError('Falha ao atualizar guarda roupa do usuário');
    }

    const updatedPlayer = await this.userRepository.updateUserWardobre(
      matricula,
      idFeet,
      idLowerBody,
      idUpperBody,
    );

    if (!updatedPlayer) {
      return new AppError('Falha ao atualizar usuário');
    }

    return true;
  }
}
