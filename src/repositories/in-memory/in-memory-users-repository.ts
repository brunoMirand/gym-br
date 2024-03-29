import { randomUUID } from 'node:crypto';
import { User } from '@/domain/entities/user';
import { UsersRepository } from '@/repositories/interfaces/users-repository';

export class InMemoryUsersRepositoryArray implements UsersRepository {
  private users: User[] = [];

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      return null;
    }
    return user;
  }

  async create(data: Input) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    return user;
  }
}

export class InMemoryUsersRepository implements UsersRepository {
  private users: Map<string, User> = new Map();

  async findByEmail(email: string) {
    const users = Array.from(this.users.values());
    const userFound = users.find(user => user.email === email);
    if (!userFound) {
      return null;
    }
    return userFound;
  }

  async create(data: Input) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.set(user.id, user);

    return user;
  }

  async findById(id: string) {
    const user = this.users.get(id);
    if (!user) {
      return null;
    }
    return user;
  }
}

type Input = {
  name: string
  email: string
  password_hash: string
};
