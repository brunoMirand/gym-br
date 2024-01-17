import { UsersRepository } from '@/repositories/interfaces/users-repository';

export class InMemoryUsersRepositoryArray implements UsersRepository {
  private users: Output[] = [];

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(data: Input) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}

export class InMemoryUsersRepository implements UsersRepository {
  private users: Map<string, Output> = new Map();

  async findByEmail(email: string) {
    const user = this.users.get(email);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(data: Input) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.set(user.email, user);

    return user;
  }
}

type Input = {
  name: string
  email: string
  password_hash: string
};

type Output = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};