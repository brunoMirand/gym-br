import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUser } from '@/use-cases/authenticate-user';

export function makeAuthenticateUseCase(): AuthenticateUser {
  const userRepository = new PrismaUserRepository();
  return new AuthenticateUser(userRepository);
}
