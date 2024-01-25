import { InputGym } from '@/domain/entities/gym';
import { CreateGym } from '@/use-cases/create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymError } from '@/use-cases/errors';

describe('Use Case - Create Gym', () => {
  let gymsRepository: InMemoryGymsRepository;
  let sut: CreateGym;

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGym(gymsRepository);
  });

  it('should be able create new gym', async () => {
    //given
    const input: InputGym = {
      title: 'Automatize seu corpo',
      description: 'Seja forte igual o php4',
      phone: '5511996374152',
      latitude: -23.5123115,
      longitude: -46.8349725,
    };

    //when
    const gym = await sut.execute(input);

    //then
    expect(gym).toBeTruthy();
    expect(gym.title).toBe('Automatize seu corpo');
  });

  it('should not be able create gym when any exception occurs', async () => {
    const input: InputGym = {
      title: 'at',
      description: 'Seja forte igual o php4',
      phone: '5511996374152',
      latitude: -23.5123115,
      longitude: -46.8349725,
    };

    //when//then
    await expect(() => sut.execute(input)).rejects.toThrow(new CreateGymError());
  });
});
