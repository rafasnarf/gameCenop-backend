import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from '../../../shared/errors/AppError';
import { Player } from '../infra/typeorm/entities/Player';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

@Injectable()
export class UpdateUserClothesService {
  constructor(
    @InjectRepository(Player)
    private userRepository: UserRepository,
  ) {}

  public async execute(
    matricula: string,
    itemId: string,
    itemSubTip: number,
  ): Promise<boolean | AppError> {
    if (!matricula || matricula.trim() === '') {
      return new AppError('Falha ao salvar item, informa a matrícula');
    } else if (!itemId || itemId.trim() === '') {
      return new AppError('Falha ao salvar item, informe ID do Item');
    } else if (!itemSubTip || itemSubTip > 3 || itemSubTip <= 0) {
      return new AppError('Falha ao salvar item, verifique o subitem');
    }

    const updatedUser = await this.userRepository.updateUserClothes(
      matricula,
      itemId,
      itemSubTip,
    );

    if (!updatedUser) {
      return new AppError('Falha ao atualizar roupas do usuário');
    }

    return true;
  }
}
