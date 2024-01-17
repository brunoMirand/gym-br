import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUser } from '@/use-cases/register-user';

export function makeRegisterUseCase(): RegisterUser {
  const userRepository = new PrismaUserRepository();
  return new RegisterUser(userRepository);
}
