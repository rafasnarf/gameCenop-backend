import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { PlayerItems } from '../infra/typeorm/entities/PlayerItems';
import AppError from '../../../shared/errors/AppError';

@Injectable()
export class CheckUserItemsService {
  constructor(
    @InjectRepository(PlayerItems)
    private userRepository: UserRepository,
  ) {}

  public async execute(matricula: string): Promise<PlayerItems[] | AppError> {
    if (!matricula) {
      return new AppError('Matricula não informada');
    }

    const foundedItems = await this.userRepository.checkUserItems(matricula);

    return foundedItems;
  }
}
