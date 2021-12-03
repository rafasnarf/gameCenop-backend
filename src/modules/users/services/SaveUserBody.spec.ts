import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import UserBodyDTO from '../dtos/UserBodyDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { SaveUserBodyService } from './SaveUserBody.service';

describe('SaveUserBodyService', () => {
  let service: SaveUserBodyService;
  let userRepository: FakeUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveUserBodyService,
        {
          provide: getRepositoryToken(Player),
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    service = await module.resolve(SaveUserBodyService);
    userRepository = await module.resolve(getRepositoryToken(Player));
  });

  it('should return a error from incorrent matricula', async () => {
    const user: UserBodyDTO = {
      matricula: '',
      idBody: 'teste',
      idEye: 'teste',
      idHair: 'teste',
      idLip: 'teste',
      idTipSex: 1,
      wallet: 100,
      idBeard: 'teste',
    };

    const result = await service.execute(user);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a valid saved player', async () => {
    const user: UserBodyDTO = {
      matricula: 'teste',
      idBody: 'teste',
      idEye: 'teste',
      idHair: 'teste',
      idLip: 'teste',
      idTipSex: 1,
      wallet: 100,
      idBeard: 'teste',
    };

    const result = await service.execute(user);

    expect(result).toHaveProperty('createdAt');
  });
});
