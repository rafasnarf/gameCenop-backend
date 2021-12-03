import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entities
import { TipItem } from './infra/typeorm/entities/TipItem';
import { TipSex } from './infra/typeorm/entities/TipSex';
import { TipSubItem } from './infra/typeorm/entities/TipSubItem';
import { Beard } from './infra/typeorm/entities/Beard';
import { Body } from './infra/typeorm/entities/Body';
import { Eye } from './infra/typeorm/entities/Eye';
import { Hair } from './infra/typeorm/entities/Hair';
import { Item } from './infra/typeorm/entities/Item';
import { Lip } from './infra/typeorm/entities/Lip';

//Services
import { FindAllItemsService } from './services/FindAllItems.service';
import { AddNewItemService } from './services/AddNewItem.service';

//Controller
import { ItemsController } from './infra/http/controllers/items.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TipSubItem,
      TipSex,
      TipItem,
      Beard,
      Body,
      Eye,
      Hair,
      Item,
      Lip,
    ]),
  ],
  providers: [FindAllItemsService, AddNewItemService],
  controllers: [ItemsController],
  exports: [TypeOrmModule],
})
export class ItemsModule {}
