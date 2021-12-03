import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import UserBodyDTO from '../dtos/UserBodyDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { SaveUserItemService } from './SaveUserItem.service';

describe('SaveUserBodyService', () => {
  let service: SaveUserItemService;
  let userRepository: FakeUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveUserItemService,
        {
          provide: getRepositoryToken(Player),
          useClass: FakeUserRepository,
        },
      ],
    }).compile();

    service = await module.resolve(SaveUserItemService);
    userRepository = await module.resolve(getRepositoryToken(Player));
  });

  it('should return a error from incorret matricula', async () => {
    const matricula = '';
    const idItem = 'Teste';

    const result = await service.execute(matricula, idItem);

    expect(result).toBeInstanceOf(AppError);
  });

  it('should return a sucessful save', async () => {
    const matricula = 'f1234567';
    const idItem = 'Teste';

    const result = await service.execute(matricula, idItem);

    expect(result).toBe(true);
  });
});
