import { User } from '@/domain/entities/user';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors';

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new ResourceNotFoundError();
    }

    return user;
  }
}
