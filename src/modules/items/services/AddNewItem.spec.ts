import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import { FakeItemsRepository } from '../repositories/fakes/FakeItemsRepository';
import { Item } from '../infra/typeorm/entities/Item';
import { AddNewItemService } from './AddNewItem.service';
import ItemDTO from '../dtos/ItemDTO';

describe('AddNewItemService', () => {
  let service: AddNewItemService;
  let itemsRepository: FakeItemsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddNewItemService,
        {
          provide: getRepositoryToken(Item),
          useClass: FakeItemsRepository,
        },
      ],
    }).compile();

    service = await module.resolve(AddNewItemService);
    itemsRepository = await module.resolve(getRepositoryToken(Item));
  });

  it('should return a error', async () => {
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    const newItem: ItemDTO = {
      nome: 'Teste',
      nomeArquivo: '',
      idTip: 1,
      idSubTipo: 1,
      valor: 100.0,
      idTipSex: 1,
    };

    const savedItem = await service.execute(newItem);

    expect(savedItem).toBeInstanceOf(AppError);
  });

  it('should return a new item added', async () => {
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    const newItem: ItemDTO = {
      nome: 'Teste',
      nomeArquivo: 'Teste',
      idTip: 1,
      idSubTipo: 1,
      valor: 100.0,
      idTipSex: 1,
    };

    const savedItem = await service.execute(newItem);

    expect(savedItem).toHaveProperty('id');
  });
});
