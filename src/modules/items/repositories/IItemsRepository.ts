import ItemDTO from '../dtos/ItemDTO';
import { Item } from '../infra/typeorm/entities/Item';

export default interface IItemsRepository {
  getAllItems(): Promise<Item[]>;
  saveItem(itemData: ItemDTO): Promise<Item>;
}
