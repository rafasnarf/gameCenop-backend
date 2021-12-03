import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ItemDTO from '../dtos/ItemDTO';
import { Item } from '../infra/typeorm/entities/Item';
import AppError from '../../../shared/errors/AppError';
import { ItemsRepository } from '../infra/typeorm/repositories/ItemsRepository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AddNewItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: ItemsRepository,
  ) {}

  public async execute({
    nome,
    nomeArquivo,
    idTip,
    idSubTipo,
    idTipSex,
    valor,
  }: ItemDTO): Promise<Item | AppError> {
    if (!nome || !nomeArquivo || !idTip || !idSubTipo || !idTipSex || !valor) {
      return new AppError('Informações faltantes, verifique e tente novamente');
    } else if (
      nome.trim().length === 0 ||
      nomeArquivo.trim().length === 0 ||
      valor <= 0 ||
      idTipSex <= 0 ||
      idTipSex >= 3
    ) {
      return new AppError('Informações faltantes, verifique e tente novamente');
    }
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    const newItem: Item = {
      id: uuid(),
      nome,
      nomeArquivo,
      idTip,
      idSubTipo,
      idTipSex,
      valor,
      createdAt: today,
      updatedAt: today,
    };

    const savedItem = await this.itemsRepository.saveItem(newItem);

    return savedItem;
  }
}
