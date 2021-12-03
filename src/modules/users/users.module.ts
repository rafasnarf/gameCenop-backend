import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Entities
import { Player } from './infra/typeorm/entities/Player';
import { PlayerItems } from './infra/typeorm/entities/PlayerItems';

//Services
import { UpdateUserWardobreService } from './services/UpdateUserWardobre.service';
import { UpdateUserWalletService } from './services/UpdateUserWallet.service';
import { UpdateUserClothesService } from './services/UpdateUserClothes.service';
import { SaveUserItemService } from './services/SaveUserItem.service';
import { SaveUserBodyService } from './services/SaveUserBody.service';
import { SaveUserService } from './services/SaveUser.service';

//Controller
import { UsersController } from './infra/http/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerItems])],
  providers: [
    UpdateUserWardobreService,
    UpdateUserWalletService,
    UpdateUserClothesService,
    SaveUserItemService,
    SaveUserBodyService,
    SaveUserService,
  ],
  controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
