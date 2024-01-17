import { RegisterUser } from '@/use-cases/register-user';
import { UserAlreadyExistsError } from '@/use-cases/errors';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let userRepository: InMemoryUsersRepository;
let sut: RegisterUser;

describe('Use Case - Register User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new RegisterUser(userRepository);
  });

  it('should return success when register new user', async () => {
    //given
    const inputUser = {
      name: 'Breno Lopes',
      email: 'brenolopess@gmail.com',
      password: 'lopesbrenos@',
    };

    //when
    const result = await sut.execute(inputUser);

    //then
    expect(result).toBe(void 0);
  });

  it('should return existing user when register with the same email', async () => {
    //given
    const inputUser = {
      name: 'Breno Lopes',
      email: 'brenolopess@gmail.com',
      password: 'lopesbrenos@',
    };

    //when
    await sut.execute(inputUser);

    //then
    await expect(() => sut.execute(inputUser)).rejects.toThrow(new UserAlreadyExistsError());
  });
});
