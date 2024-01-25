import { User } from '@/domain/entities/user';

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Input): Promise<User>;
  findById(id: string): Promise<User | null>;
}

type Input = {
  name: string
  email: string
  password_hash: string
};
