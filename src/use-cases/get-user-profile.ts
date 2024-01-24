import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { ResourceNotFoundError } from '@/use-cases/errors';

export class GetUserProfile {
  constructor(private usersRepository: UsersRepository) { }

  async execute(id: string): Promise<Output> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new ResourceNotFoundError();
    }

    return user;
  }
}

type Output = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};
