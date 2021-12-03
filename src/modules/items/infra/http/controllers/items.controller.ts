import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import ItemDTO from 'src/modules/items/dtos/ItemDTO';

import { AddNewItemService } from '../../../services/AddNewItem.service';
import { FindAllItemsService } from '../../../services/FindAllItems.service';
import { ItemsRepository } from '../../typeorm/repositories/ItemsRepository';

@Controller('items')
export class ItemsController {
  private itemsRepository: ItemsRepository;

  constructor() {
    this.itemsRepository = new ItemsRepository();
  }

  @Get()
  async findAllItems(@Res() response: Response): Promise<Response> {
    const findAllItemsService = new FindAllItemsService(this.itemsRepository);

    const foundedItems = await findAllItemsService.execute();

    return response.json(foundedItems);
  }

  @Post()
  async saveNewItem(
    @Body() itemData: ItemDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const addNewItemService = new AddNewItemService(this.itemsRepository);

    const savedItem = await addNewItemService.execute(itemData);

    return response.json(savedItem);
  }
}
