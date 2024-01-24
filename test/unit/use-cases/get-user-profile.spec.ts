import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import {  GetUserProfile } from '@/use-cases/get-user-profile';
import { ResourceNotFoundError  } from '@/use-cases/errors';

let userRepository: InMemoryUsersRepository;
let sut: GetUserProfile;

describe('Use Case - Authentication User', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserProfile(userRepository);
  });

  it('should return success when trying authenticate with valid credentials', async () => {
    //given
    const input = {
      email: 'brenobruce@uol.com',
      password: 'ouniversoonline',
    };

    const password_hash = await hash(input.password, 6);

    const user = await userRepository.create({
      name: 'Bruno',
      email: 'brenobruce@uol.com',
      password_hash
    });

    //when
    const result = await sut.execute(user.id);

    //then
    expect(result.id).toEqual(expect.any(String));
    expect(result.name).toBe('Bruno');
  });

  it('should return failed authentication when email does not exist', async () => {
    //given//when//then
    await expect(() => sut.execute('fake-id')).rejects.toThrow(new ResourceNotFoundError());
  });
});
