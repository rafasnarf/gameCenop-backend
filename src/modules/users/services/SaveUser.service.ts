import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../infra/typeorm/entities/Player';
import UserDTO from '../dtos/UserDTO';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import AppError from '../../../shared/errors/AppError';

@Injectable()
export class SaveUserService {
  constructor(
    @InjectRepository(Player)
    private userRepository: UserRepository,
  ) {}

  public async execute({
    matricula,
    idTipSex,
    idBody,
    idEye,
    idFeet,
    idHair,
    idLip,
    idLowerBody,
    idUpperBody,
    wallet,
    idBeard,
  }: UserDTO): Promise<Player | AppError> {
    if (
      !matricula ||
      !idTipSex ||
      matricula.trim().length <= 0 ||
      idTipSex <= 0 ||
      idTipSex >= 3
    ) {
      return new AppError(
        'Houve um erro ao salvar o jogador, reveja e tente novamente',
      );
    }

    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    let newPlayer = new Player();

    if (idTipSex === 1) {
      newPlayer = {
        matricula,
        idBodyPlayer: idBody,
        idHairPlayer: idHair,
        idEyePlayer: idEye,
        idTipSex,
        idLipPlayer: idLip,
        idFeet,
        idBeardPlayer: idBeard,
        idLowerBody,
        idUpperBody,
        wallet,
        createdAt: today,
        updatedAt: today,
      };
    } else if (idTipSex === 2) {
      newPlayer = {
        matricula,
        idBodyPlayer: idBody,
        idHairPlayer: idHair,
        idEyePlayer: idEye,
        idTipSex,
        idLipPlayer: idLip,
        idFeet,
        idLowerBody,
        idUpperBody,
        idBeardPlayer: null,
        wallet,
        createdAt: today,
        updatedAt: today,
      };
    }

    const savedUser = await this.userRepository.saveUser(newPlayer);

    return savedUser;
  }
}
