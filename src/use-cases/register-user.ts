import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '@/use-cases/errors';
import { UsersRepository } from '@/repositories/interfaces/users-repository';

export class RegisterUser {
  constructor(private userRepository: UsersRepository) { }

  async execute(input: Input): Promise<void> {
    const { name, email, password } = input;
    const password_hash = await hash(password, 6);
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    await this.userRepository.create({
      name,
      email,
      password_hash
    });
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
}
