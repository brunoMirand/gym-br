import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUser } from '@/use-cases/authenticate-user';
import { InvalidCredentialsError } from '@/use-cases/errors';

let userRepository: InMemoryUsersRepository;
let sut: AuthenticateUser;

describe('Use Case - Authentication User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUser(userRepository);
  });

  it('should return success when trying authenticate with valid credentials', async () => {
    //given
    const inputAuthentication = {
      email: 'brenobruce@uol.com',
      password: 'ouniversoonline',
    };

    const password_hash = await hash(inputAuthentication.password, 6);

    await userRepository.create({
      name: 'Bruno',
      email: 'brenobruce@uol.com',
      password_hash
    });

    //when
    const result = await sut.execute(inputAuthentication);

    //then
    expect(result.id).toEqual(expect.any(String));
    expect(result.email).toBe(inputAuthentication.email);
  });

  it('should return failed authentication when email does not exist', async () => {
    //given
    const inputAuthentication = {
      email: 'brenobruce@uol.com',
      password: 'ouniversoonline',
    };

    //when//then
    await expect(() => sut.execute(inputAuthentication)).rejects.toThrow(new InvalidCredentialsError());
  });

  it('should return failed authentication when password no matching', async () => {
    //given
    const inputAuthentication = {
      email: 'brenobruce@uol.com',
      password: 'ouniversoonline',
    };

    const password_hash = await hash('ouniversooffline', 6);
    userRepository.create({
      name: 'Breno Silva',
      email: 'brenobruce@uol.com',
      password_hash
    });

    //when//then
    await expect(() => sut.execute(inputAuthentication)).rejects.toThrow(new InvalidCredentialsError());
  });
});
