import { compare } from 'bcryptjs';
import { UsersRepository } from '@/repositories/interfaces/users-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/';

export class AuthenticateUser {
  constructor(private userRepository: UsersRepository) { }

  async execute(input: Input): Promise<Output> {
    const { email, password } = input;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isMatchingPassword = await compare(password, user.password_hash);
    if (!isMatchingPassword) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}

type Input = {
  email: string;
  password: string;
}

type Output = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};
