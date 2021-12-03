import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import UserDTO from '../dtos/UserDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { UpdateUserWardobreService } from './UpdateUserWardobre.service';
import { SaveUserService } from './SaveUser.service';

describe('UpdateUserWalletService', () => {
  let service: UpdateUserWardobreService;
  let saveUserService: SaveUserService;
  let userRepository: FakeUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserWardobreService,
        SaveUserService,
        {
          provide: getRepositoryToken(Player),
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    service = await module.resolve(UpdateUserWardobreService);
    saveUserService = await module.resolve(SaveUserService);
    userRepository = await module.resolve(getRepositoryToken(Player));
  });

  it('should return a error from incorret matricula', async () => {
    const user: UserDTO = {
      matricula: 'f1234567',
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

    await saveUserService.execute(user);

    const matricula = '';
    const idFeet = '';
    const idLowerBody = '';
    const idUpperBody = '';

    const result = await service.execute(
      matricula,
      idFeet,
      idLowerBody,
      idUpperBody,
    );

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a sucessfull update', async () => {
    const user: UserDTO = {
      matricula: 'f1234567',
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

    await saveUserService.execute(user);

    const matricula = 'f1234567';
    const idFeet = 'teste1';
    const idLowerBody = 'teste2';
    const idUpperBody = 'teste3';

    const result = await service.execute(
      matricula,
      idFeet,
      idLowerBody,
      idUpperBody,
    );

    expect(result).toBe(true);
  });
});
