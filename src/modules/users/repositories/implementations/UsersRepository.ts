import { getRepository, Repository } from 'typeorm';
import { GamesRepository } from '../../../games/repositories/implementations/GamesRepository';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({ user_id }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne(user_id);
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.find({
      order: {
        first_name: "ASC",
        id: "ASC"
      },
    });
    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository.find({
      where: { first_name, last_name }
    });
    return users;
  }
}
