import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import IUserDTO from '../dtos/UserDTO';
import UserDTO from '../dtos/UserDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { CheckUserService } from './CheckUser.service';
import { SaveUserService } from './SaveUser.service';

describe('CheckUserService', () => {
  let service: CheckUserService;
  let saveUserService: SaveUserService;
  let userRepository: FakeUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckUserService,
        SaveUserService,
        {
          provide: getRepositoryToken(Player),
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    service = await module.resolve(CheckUserService);
    saveUserService = await module.resolve(SaveUserService);
    userRepository = await module.resolve(getRepositoryToken(Player));
  });

  it('should return a error from incorrent matricula', async () => {
    const matricula = 'f8365846';

    const result = await service.execute(matricula);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a corretc player data', async () => {
    const matricula = 'f1111111';

    const player: IUserDTO = {
      matricula: 'f1111111',
      idBody: 'teste',
      idEye: 'teste',
      idFeet: 'teste',
      idHair: 'teste',
      idLip: 'teste',
      idLowerBody: 'teste',
      idTipSex: 1,
      idUpperBody: 'teste',
      wallet: 100,
      idBeard: 'teste',
    };

    await saveUserService.execute(player);

    const result = await service.execute(matricula);

    expect(result).toHaveProperty('matricula', 'f1111111');
  });

  it('should return a corretc player data of multiples entries', async () => {
    const matricula = 'f2222222';

    const player: IUserDTO = {
      matricula: 'f1111111',
      idBody: 'teste',
      idEye: 'teste',
      idFeet: 'teste',
      idHair: 'teste',
      idLip: 'teste',
      idLowerBody: 'teste',
      idTipSex: 1,
      idUpperBody: 'teste',
      wallet: 100,
      idBeard: 'teste',
    };

    const player2: IUserDTO = {
      matricula: 'f2222222',
      idBody: 'teste',
      idEye: 'teste',
      idFeet: 'teste',
      idHair: 'teste',
      idLip: 'teste',
      idLowerBody: 'teste',
      idTipSex: 1,
      idUpperBody: 'teste',
      wallet: 100,
      idBeard: 'teste',
    };

    await saveUserService.execute(player);
    await saveUserService.execute(player2);

    const result = await service.execute(matricula);

    expect(result).toHaveProperty('matricula', 'f2222222');
  });
});
