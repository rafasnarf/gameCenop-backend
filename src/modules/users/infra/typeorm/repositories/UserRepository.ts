import { getRepository, Repository, getConnection } from 'typeorm';

import IUserRepository from 'src/modules/users/repositories/IUserRepository';
import { Player } from '../entities/Player';
import UserBodyDTO from 'src/modules/users/dtos/UserBodyDTO';
import { PlayerItems } from '../entities/PlayerItems';
import e from 'express';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<Player>;
  private playerItemsRepository: Repository<PlayerItems>;

  constructor() {
    this.ormRepository = getRepository(Player);
    this.playerItemsRepository = getRepository(PlayerItems);
  }

  public async saveUser(user: Player): Promise<Player> {
    const savedUser = this.ormRepository.create(user);

    await this.ormRepository.save(savedUser);

    return savedUser;
  }

  public async checkUser(matricula: string): Promise<Player | undefined> {
    const foundedUser = await this.ormRepository.findOne({
      where: { matricula },
    });

    return foundedUser;
  }

  public async saveUserBody(userData: UserBodyDTO): Promise<Player> {
    const today = new Date();
    const {
      matricula,
      idBody,
      idEye,
      idHair,
      idLip,
      idTipSex,
      wallet,
      idBeard,
    } = userData;

    let savedBody;

    if (idTipSex === 1) {
      savedBody = this.ormRepository.create({
        matricula: matricula,
        idBodyPlayer: idBody,
        idEyePlayer: idEye,
        idHairPlayer: idHair,
        idLipPlayer: idLip,
        idTipSex: idTipSex,
        wallet: wallet,
        idBeardPlayer: idBeard,
        createdAt: today,
      });
    } else if (idTipSex === 2) {
      savedBody = this.ormRepository.create({
        matricula: matricula,
        idBodyPlayer: idBody,
        idEyePlayer: idEye,
        idHairPlayer: idHair,
        idLipPlayer: idLip,
        idTipSex: idTipSex,
        wallet: wallet,
        createdAt: today,
      });
    }

    const result = await this.ormRepository.save(savedBody);

    return result;
  }

  public async checkUserItems(matricula: string): Promise<PlayerItems[]> {
    const founded = await this.playerItemsRepository
      .createQueryBuilder('player')
      .where('idPlayer = :id', { id: matricula })
      .execute();

    const jsonFounded = JSON.parse(JSON.stringify(founded));

    const foundedItems: PlayerItems[] = [];

    jsonFounded.forEach(e => {
      const item = new PlayerItems();
      item.idPlayer = e.player_idPlayer;
      item.idItem = e.player_idItem;
      item.createdAt = e.player_createdAt;
      item.updatedAt = e.player_updatedAt;
      foundedItems.push(item);
    });

    return foundedItems;
  }

  public async updateUserWallet(
    matricula: string,
    wallet: number,
  ): Promise<Player> {
    const player = await this.ormRepository.findOne({ where: { matricula } });

    player.wallet = wallet;

    const savedPlayer = await this.ormRepository.save(player);

    return savedPlayer;
  }

  public async updateUserClothes(
    matricula: string,
    itemId: string,
    itemSubTip: number,
  ): Promise<Player> {
    const player = await this.ormRepository.findOne({ where: { matricula } });
    let updatedPlayer: Player;
    switch (itemSubTip) {
      case 1:
        player.idFeet = itemId;
        updatedPlayer = await this.ormRepository.save(player);
        break;
      case 2:
        player.idLowerBody = itemId;
        updatedPlayer = await this.ormRepository.save(player);
        break;
      case 3:
        player.idUpperBody = itemId;
        updatedPlayer = await this.ormRepository.save(player);
        break;
      default:
        break;
    }

    return updatedPlayer;
  }

  public async updateUserWardobre(
    matricula: string,
    idFeet: string,
    idLowerBody: string,
    idUpperBody: string,
  ): Promise<Player> {
    const player = await this.ormRepository.findOne({
      where: { matricula: matricula },
    });
    player.idFeet = idFeet;
    player.idLowerBody = idLowerBody;
    player.idUpperBody = idUpperBody;

    const updatedPlayer = await this.ormRepository.save(player);
    return updatedPlayer;
  }

  public async saveUserItem(
    matricula: string,
    idItem: string,
  ): Promise<PlayerItems> {
    const today = new Date();
    const newPlayerItem = this.playerItemsRepository.create({
      idPlayer: matricula,
      idItem,
      createdAt: today,
    });

    const savedItem = await this.playerItemsRepository.save(newPlayerItem);

    return savedItem;
  }
}
