import { Body, Controller, Get, Post, Res, Query, Patch } from '@nestjs/common';
import { response, Response } from 'express';

import { UserRepository } from '../../typeorm/repositories/UserRepository';

import { SaveUserBodyService } from '../../../services/SaveUserBody.service';
import { SaveUserService } from '../../../services/SaveUser.service';
import { CheckUserService } from '../../../services/CheckUser.service';
import { SaveUserItemService } from '../../../services/SaveUserItem.service';
import { UpdateUserClothesService } from '../../../services/UpdateUserClothes.service';
import { UpdateUserWalletService } from '../../../services/UpdateUserWallet.service';
import { UpdateUserWardobreService } from '../../../services/UpdateUserWardobre.service';
import { CheckUserItemsService } from '../../../services/CheckUserItems.service';

import UserBodyDTO from 'src/modules/users/dtos/UserBodyDTO';
import UserDTO from 'src/modules/users/dtos/UserDTO';

@Controller('users')
export class UsersController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  @Post()
  async saveUser(
    @Body() userData: UserDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const saveUserService = new SaveUserService(this.userRepository);

    const savedUser = saveUserService.execute(userData);

    return response.json(savedUser);
  }

  @Post('addBody')
  async saveUserBody(
    @Body() userData: UserBodyDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const saveUserBodyService = new SaveUserBodyService(this.userRepository);

    const savedBodyUser = await saveUserBodyService.execute(userData);

    return response.json(savedBodyUser);
  }

  @Get()
  async checkUser(
    @Query('matricula') matricula: string,
    @Res() response: Response,
  ): Promise<Response> {
    const checkUserService = new CheckUserService(this.userRepository);

    const foundedUser = await checkUserService.execute(matricula);

    return response.json(foundedUser);
  }

  @Post('addItem')
  async saveUserItem(
    @Body() userItemData: { matricula: string; idItem: string },
    @Res() response: Response,
  ): Promise<Response> {
    const { matricula, idItem } = userItemData;

    const saveUserItemService = new SaveUserItemService(this.userRepository);

    const savedUserItem = await saveUserItemService.execute(matricula, idItem);

    return response.json(savedUserItem);
  }
  @Patch('wallet')
  async updateUserWallet(
    @Body() walletData: { matricula: string; wallet: number },
    @Res() response: Response,
  ): Promise<Response> {
    const { matricula, wallet } = walletData;

    const updateUserWalletService = new UpdateUserWalletService(
      this.userRepository,
    );

    const updatedUser = await updateUserWalletService.execute(
      matricula,
      wallet,
    );

    return response.json(updatedUser);
  }

  @Patch('clothes')
  async updateUserClothes(
    @Body()
    updateData: {
      matricula: string;
      itemId: string;
      itemSubTip: number;
    },
    @Res() response: Response,
  ): Promise<Response> {
    const { matricula, itemId, itemSubTip } = updateData;

    const updateUserClothesService = new UpdateUserClothesService(
      this.userRepository,
    );

    const updatedUser = await updateUserClothesService.execute(
      matricula,
      itemId,
      itemSubTip,
    );

    return response.json(updatedUser);
  }

  @Patch('wardobre')
  async updateUserWardobre(
    @Body()
    updateData: {
      matricula: string;
      idFeet: string;
      idLowerBody: string;
      idUpperBody: string;
    },
    @Res() response: Response,
  ): Promise<Response> {
    const { matricula, idFeet, idLowerBody, idUpperBody } = updateData;
    const updateUserWardobreService = new UpdateUserWardobreService(
      this.userRepository,
    );

    const updatedUser = await updateUserWardobreService.execute(
      matricula,
      idFeet,
      idLowerBody,
      idUpperBody,
    );

    return response.json(updatedUser);
  }

  @Get('items')
  async checkUserItems(
    @Query('matricula') matricula: string,
    @Res() response: Response,
  ): Promise<Response> {
    const checkUserItemsService = new CheckUserItemsService(
      this.userRepository,
    );

    const result = await checkUserItemsService.execute(matricula);

    return response.json(result);
  }
}
