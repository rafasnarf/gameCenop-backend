import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from '../../../shared/errors/AppError';
import { Player } from '../infra/typeorm/entities/Player';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

@Injectable()
export class SaveUserItemService {
  constructor(
    @InjectRepository(Player)
    private userRepository: UserRepository,
  ) {}

  public async execute(
    matricula: string,
    idItem: string,
  ): Promise<boolean | AppError> {
    if (!matricula) {
      return new AppError('Falha ao salvar item, informe a matrícula');
    } else if (!idItem) {
      return new AppError('Falha ao salvar item, informe o ID do item');
    }

    const savedItem = await this.userRepository.saveUserItem(matricula, idItem);

    if (!savedItem) {
      return new AppError('Falha geral ao salvar item');
    }

    return true;
  }
}
