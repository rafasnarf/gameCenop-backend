import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import { FakeItemsRepository } from '../repositories/fakes/FakeItemsRepository';
import { Item } from '../infra/typeorm/entities/Item';
import { FindAllItemsService } from './FindAllItems.service';

describe('FindAllItemsService', () => {
  let service: FindAllItemsService;
  let itemsRepository: FakeItemsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllItemsService,
        {
          provide: getRepositoryToken(Item),
          useClass: FakeItemsRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindAllItemsService);
    itemsRepository = await module.resolve(getRepositoryToken(Item));
  });

  it('should return a error with no items registred', async () => {
    const foundedItems = await service.execute();

    expect(foundedItems).toBeInstanceOf(AppError);
  });
});
