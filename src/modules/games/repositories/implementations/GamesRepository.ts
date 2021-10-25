import { getRepository, ILike, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(title: string): Promise<Game[]> {
    const games = await this.repository.find({
      title: ILike("%out #%"),
  });

  return games;

  }

  async countAllGames(): Promise<[{ count: string }]> {
    const totalGames = await this.repository.count();
    return totalGames;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = [];
    const usersTosend = [];
    const games = this.repository.find();
    games.forEach(game => {
      users.push(game.users)
    });

    users.forEach(user => {
      if (user.id == id) {
        usersTosend.push(user);
      }
    });

    return usersTosend;
  }
}
