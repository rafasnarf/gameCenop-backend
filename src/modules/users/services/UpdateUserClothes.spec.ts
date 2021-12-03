import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import UserDTO from '../dtos/UserDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { SaveUserService } from './SaveUser.service';
import { UpdateUserClothesService } from './UpdateUserClothes.service';

describe('UpdateUserClothesService', () => {
  let service: UpdateUserClothesService;
  let saveUserService: SaveUserService;
  let userRepository: FakeUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserClothesService,
        SaveUserService,
        {
          provide: getRepositoryToken(Player),
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    service = await module.resolve(UpdateUserClothesService);
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
    const itemID = 'teste';
    const itemSubTip = 1;

    const result = await service.execute(matricula, itemID, itemSubTip);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a error from incorret item ID', async () => {
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
    const itemID = '';
    const itemSubTip = 1;

    const result = await service.execute(matricula, itemID, itemSubTip);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a error from incorret Item Sub Type', async () => {
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
    const itemID = 'teste';
    const itemSubTip = 0;

    const result = await service.execute(matricula, itemID, itemSubTip);

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
    const itemID = 'teste1';
    const itemSubTip = 3;

    const result = await service.execute(matricula, itemID, itemSubTip);

    expect(result).toBe(true);
  });
});
