import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppError from '../../../shared/errors/AppError';
import UserBodyDTO from '../dtos/UserBodyDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';

@Injectable()
export class SaveUserBodyService {
  constructor(
    @InjectRepository(Player)
    private userRepository: UserRepository,
  ) {}

  public async execute({
    idBody,
    idEye,
    idHair,
    idLip,
    idTipSex,
    matricula,
    wallet,
    idBeard,
  }: UserBodyDTO): Promise<Player | AppError> {
    if (
      !matricula ||
      !idTipSex ||
      !idBody ||
      !idEye ||
      !idHair ||
      !idLip ||
      !wallet
    ) {
      return new AppError('Há algum item faltando, corrija e tente novamente');
    }

    let newUserBody: UserBodyDTO;

    if (idTipSex === 1) {
      newUserBody = {
        matricula,
        idBody,
        idEye,
        idTipSex,
        idLip,
        idHair,
        wallet,
        idBeard,
      };
    } else if (idTipSex === 2) {
      newUserBody = {
        matricula,
        idBody,
        idEye,
        idTipSex,
        idLip,
        idHair,
        wallet,
        idBeard: null,
      };
    }

    const savedUser = await this.userRepository.saveUserBody(newUserBody);

    return savedUser;
  }
}
