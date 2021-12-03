import ItemDTO from '../../dtos/ItemDTO';
import { Item } from '../../infra/typeorm/entities/Item';
import IItemsRepository from '../IItemsRepository';

export class FakeItemsRepository implements IItemsRepository {
  private items: Item[] = [];

  public async getAllItems(): Promise<Item[]> {
    const foundedItems = this.items;

    return foundedItems;
  }

  public async saveItem({
    id,
    nome,
    nomeArquivo,
    idTip,
    idSubTipo,
    idTipSex,
    valor,
    createdAt,
    updatedAt,
  }: ItemDTO): Promise<Item> {
    const newItem: Item = {
      id,
      nome,
      nomeArquivo,
      idTip,
      idSubTipo,
      idTipSex,
      valor,
      createdAt,
      updatedAt,
    };

    this.items.push(newItem);

    return newItem;
  }
}
