import UserBodyDTO from '../../dtos/UserBodyDTO';
import { Player } from '../../infra/typeorm/entities/Player';
import { PlayerItems } from '../../infra/typeorm/entities/PlayerItems';
import IUserRepository from '../IUserRepository';

export class FakeUserRepository implements IUserRepository {
  private players: Player[] = [];
  private playerItems: PlayerItems[] = [];

  public async saveUser(user: Player): Promise<Player> {
    this.players.push(user);

    return user;
  }

  public async checkUser(matricula: string): Promise<Player | undefined> {
    const foundedUser = this.players.find(e => e.matricula === matricula);

    return foundedUser;
  }

  public async saveUserBody({
    matricula,
    idBody,
    idEye,
    idHair,
    idLip,
    idTipSex,
    wallet,
    idBeard,
  }: UserBodyDTO): Promise<Player> {
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    const newPlayer: Player = {
      matricula,
      idTipSex,
      wallet,
      idBodyPlayer: idBody,
      idEyePlayer: idEye,
      idHairPlayer: idHair,
      idLipPlayer: idLip,
      idBeardPlayer: idBeard,
      createdAt: today,
      updatedAt: today,
      idFeet: null,
      idLowerBody: null,
      idUpperBody: null,
    };

    this.players.push(newPlayer);

    return newPlayer;
  }

  public async checkUserItems(matricula: string): Promise<PlayerItems[]> {
    const foundedItems = this.playerItems.filter(e => e.idPlayer === matricula);

    return foundedItems;
  }

  public async updateUserWallet(
    matricula: string,
    wallet: number,
  ): Promise<Player> {
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    const playerIndex = this.players.findIndex(e => e.matricula === matricula);
    const player = this.players.find(e => e.matricula === matricula);

    const updatedPlayer: Player = {
      matricula: player.matricula,
      idBeardPlayer: player.idBeardPlayer,
      idBodyPlayer: player.idBodyPlayer,
      idEyePlayer: player.idEyePlayer,
      idFeet: player.idFeet,
      idHairPlayer: player.idHairPlayer,
      idLipPlayer: player.idLipPlayer,
      idLowerBody: player.idLowerBody,
      idTipSex: player.idTipSex,
      idUpperBody: player.idUpperBody,
      createdAt: player.createdAt,
      updatedAt: today,
      wallet: wallet,
    };

    this.players.splice(playerIndex, 1);
    this.players.push(updatedPlayer);

    return updatedPlayer;
  }

  public async updateUserClothes(
    matricula: string,
    itemId: string,
    itemSubTip: number,
  ): Promise<Player> {
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    const playerIndex = this.players.findIndex(e => e.matricula === matricula);
    const player = this.players.find(e => e.matricula === matricula);

    let updatedPlayer: Player;

    switch (itemSubTip) {
      case 1:
        updatedPlayer = {
          matricula: player.matricula,
          createdAt: player.createdAt,
          updatedAt: today,
          idBeardPlayer: player.idBeardPlayer,
          idBodyPlayer: player.idBodyPlayer,
          idEyePlayer: player.idEyePlayer,
          idHairPlayer: player.idHairPlayer,
          idLipPlayer: player.idLipPlayer,
          idTipSex: player.idTipSex,
          idLowerBody: player.idLowerBody,
          idUpperBody: player.idUpperBody,
          wallet: player.wallet,
          idFeet: itemId,
        };
        break;
      case 2:
        updatedPlayer = {
          matricula: player.matricula,
          createdAt: player.createdAt,
          updatedAt: today,
          idBeardPlayer: player.idBeardPlayer,
          idBodyPlayer: player.idBodyPlayer,
          idEyePlayer: player.idEyePlayer,
          idHairPlayer: player.idHairPlayer,
          idLipPlayer: player.idLipPlayer,
          idTipSex: player.idTipSex,
          idLowerBody: itemId,
          idUpperBody: player.idUpperBody,
          wallet: player.wallet,
          idFeet: player.idFeet,
        };
        break;
      case 3:
        updatedPlayer = {
          matricula: player.matricula,
          createdAt: player.createdAt,
          updatedAt: today,
          idBeardPlayer: player.idBeardPlayer,
          idBodyPlayer: player.idBodyPlayer,
          idEyePlayer: player.idEyePlayer,
          idHairPlayer: player.idHairPlayer,
          idLipPlayer: player.idLipPlayer,
          idTipSex: player.idTipSex,
          idLowerBody: player.idLowerBody,
          idUpperBody: itemId,
          wallet: player.wallet,
          idFeet: player.idFeet,
        };
        break;
      default:
        break;
    }
    this.players.splice(playerIndex, 1);
    this.players.push(updatedPlayer);

    return updatedPlayer;
  }

  public async updateUserWardobre(
    matricula: string,
    idFeet: string,
    idLowerBody: string,
    idUpperBody: string,
  ): Promise<Player> {
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    const playerIndex = this.players.findIndex(e => e.matricula === matricula);
    const player = this.players.find(e => e.matricula === matricula);

    const updatedPlayer: Player = {
      matricula: player.matricula,
      idBeardPlayer: player.idBeardPlayer,
      idBodyPlayer: player.idBodyPlayer,
      idEyePlayer: player.idEyePlayer,
      idFeet,
      idHairPlayer: player.idHairPlayer,
      idLipPlayer: player.idLipPlayer,
      idLowerBody,
      idTipSex: player.idTipSex,
      idUpperBody,
      createdAt: player.createdAt,
      updatedAt: today,
      wallet: player.wallet,
    };

    this.players.splice(playerIndex, 1);
    this.players.push(updatedPlayer);

    return updatedPlayer;
  }

  public async saveUserItem(
    matricula: string,
    idItem: string,
  ): Promise<PlayerItems> {
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    const newPlayerItem: PlayerItems = {
      idPlayer: matricula,
      idItem,
      createdAt: today,
      updatedAt: today,
    };

    this.playerItems.push(newPlayerItem);

    return newPlayerItem;
  }
}
