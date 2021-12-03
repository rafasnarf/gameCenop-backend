import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from '../../../shared/errors/AppError';
import { Player } from '../infra/typeorm/entities/Player';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

@Injectable()
export class UpdateUserWalletService {
  constructor(
    @InjectRepository(Player)
    private userRepository: UserRepository,
  ) {}

  public async execute(
    matricula: string,
    wallet: number,
  ): Promise<true | AppError> {
    if (!matricula || matricula.trim().length === 0) {
      return new AppError('Falha ao atualizar carteira, informe Matrícula');
    } else if (isNaN(wallet) || wallet <= -1) {
      return new AppError(
        'Falha ao atualizar carteira, informe novo valor na carteira',
      );
    }

    const savedUser = await this.userRepository.updateUserWallet(
      matricula,
      wallet,
    );

    if (savedUser) {
      return true;
    } else {
      return new AppError('Falha ao atualizar carteira, tente novamente');
    }
  }
}
