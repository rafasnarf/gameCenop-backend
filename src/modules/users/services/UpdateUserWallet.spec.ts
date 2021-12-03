import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import UserDTO from '../dtos/UserDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { UpdateUserWalletService } from './UpdateUserWallet.service';
import { SaveUserService } from './SaveUser.service';

describe('UpdateUserWalletService', () => {
  let service: UpdateUserWalletService;
  let saveUserService: SaveUserService;
  let userRepository: FakeUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserWalletService,
        SaveUserService,
        {
          provide: getRepositoryToken(Player),
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    service = await module.resolve(UpdateUserWalletService);
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

    const newMatricula = '';
    const newWallet = 200;

    const result = await service.execute(newMatricula, newWallet);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a error from incorret wallet', async () => {
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

    const newMatricula = 'f1234567';
    const wallet = -1;

    const result = await service.execute(newMatricula, wallet);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a correct update', async () => {
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
    const newMatricula = 'f1234567';
    const newWallet = 500;

    const result = await service.execute(newMatricula, newWallet);

    expect(result).toBe(true);
  });
});
