import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import UserDTO from '../dtos/UserDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { SaveUserService } from './SaveUser.service';

describe('SaveUserService', () => {
  let service: SaveUserService;
  let userRepository: FakeUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveUserService,
        {
          provide: getRepositoryToken(Player),
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    service = await module.resolve(SaveUserService);
    userRepository = await module.resolve(getRepositoryToken(Player));
  });

  it('should return a error from incorrent matricula', async () => {
    const user: UserDTO = {
      matricula: '',
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

    const result = await service.execute(user);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a error incorrete idTipSex', async () => {
    const user: UserDTO = {
      matricula: 'f8365846',
      idBody: 'teste',
      idEye: 'teste',
      idFeet: 'teste',
      idHair: 'teste',
      idLip: 'teste',
      idLowerBody: 'teste',
      idTipSex: 4,
      idUpperBody: 'teste',
      wallet: 100,
      idBeard: 'teste',
    };

    const result = await service.execute(user);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a valid savedUser', async () => {
    const user: UserDTO = {
      matricula: 'f8365846',
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

    const result = await service.execute(user);

    expect(result).toHaveProperty('createdAt');
  });
});
