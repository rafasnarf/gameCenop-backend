import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../infra/typeorm/entities/Item';
import AppError from '../../../shared/errors/AppError';
import { ItemsRepository } from '../infra/typeorm/repositories/ItemsRepository';

@Injectable()
export class FindAllItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: ItemsRepository,
  ) {}

  public async execute(): Promise<Item[] | AppError> {
    const foundedItems = await this.itemsRepository.getAllItems();

    if (foundedItems.length === 0) {
      return new AppError('Nenhum item cadastrado no sistema');
    }

    return foundedItems;
  }
}
