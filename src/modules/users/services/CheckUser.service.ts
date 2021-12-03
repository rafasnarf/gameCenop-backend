import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../infra/typeorm/entities/Player';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import AppError from '../../../shared/errors/AppError';

@Injectable()
export class CheckUserService {
  constructor(
    @InjectRepository(Player)
    private userRepository: UserRepository,
  ) {}

  public async execute(matricula: string): Promise<Player | AppError> {
    const foundedUser = await this.userRepository.checkUser(matricula);

    if (foundedUser === undefined) {
      return new AppError('Usuário não encontrado');
    }

    return foundedUser;
  }
}
