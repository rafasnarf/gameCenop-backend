import UserBodyDTO from '../dtos/UserBodyDTO';
import { Player } from '../infra/typeorm/entities/Player';
import { PlayerItems } from '../infra/typeorm/entities/PlayerItems';

export default interface IUserRepository {
  saveUser(user: Player): Promise<Player>;
  checkUser(matricula: string): Promise<Player | undefined>;
  saveUserBody(userData: UserBodyDTO): Promise<Player>;
  checkUserItems(matricula: string): Promise<PlayerItems[]>;
  saveUserItem(matricula: string, idItem: string): Promise<PlayerItems>;
  updateUserWallet(matricula: string, wallet: number): Promise<Player>;
  updateUserClothes(
    matricula: string,
    itemId: string,
    itemSubTip: number,
  ): Promise<Player>;
  updateUserWardobre(
    matricula: string,
    idFeet: string,
    idLowerBody: string,
    idUpperBody: string,
  ): Promise<Player>;
}
