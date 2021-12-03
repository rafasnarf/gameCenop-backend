import { getRepository, Repository } from 'typeorm';

import IItemsRepository from '../../../../items/repositories/IItemsRepository';
import ItemDTO from 'src/modules/items/dtos/ItemDTO';
import { Item } from '../entities/Item';

export class ItemsRepository implements IItemsRepository {
  private ormRepository: Repository<Item>;

  constructor() {
    this.ormRepository = getRepository(Item);
  }

  public async getAllItems(): Promise<Item[]> {
    const foundedItems = await this.ormRepository.find();

    return foundedItems;
  }

  public async saveItem(itemData: ItemDTO): Promise<Item> {
    const newItem = this.ormRepository.create(itemData);

    await this.ormRepository.save(newItem);

    return newItem;
  }
}
