import { CheckIns } from '@/use-cases/check-ins';
import { InputCheckIn } from '@/domain/entities/check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { ResourceNotFoundError, MaxDistanceError, MaxNumberOfCheckInsError } from '@/use-cases/errors';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckIns;
let gym: Output;

describe('Use Case - Create CheckIn', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckIns(checkInsRepository, gymsRepository);

    jest.useFakeTimers();

    gym = await gymsRepository.create({
      title: 'Nova Forma',
      description: 'treine o básico',
      phone: '55119966325589',
      latitude: -23.5123115,
      longitude: -46.8349725,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should to able create check in', async () => {
    //given

    const input: InputCheckIn = {
      userId: 'fake-id',
      gymId: gym.id,
      latitude: -23.5123115,
      longitude: -46.8349725,
    };

    //when
    const result = await sut.execute(input);

    //then
    expect(result.id).toEqual(expect.any(String));
  });

  it('should be able make check in twice but in different days', async () => {
    //given
    const input = {
      userId: 'fake-id',
      gymId: gym.id,
      latitude: -23.5123115,
      longitude: -46.8349725,
    };

    jest.setSystemTime(new Date('2024-01-25'));
    await sut.execute(input);

    //when
    jest.setSystemTime(new Date('2025-01-25'));
    const response = await sut.execute(input);

    //then
    expect(response).toBeTruthy();
  });

  it('should not to able make check in twice in the same day', async () => {
    //given
    const input = {
      userId: 'fake-id',
      gymId: gym.id,
      latitude: -23.5123115,
      longitude: -46.8349725,
    };

    await sut.execute(input);

    //when//then
    await expect(() => sut.execute(input)).rejects.toThrow(new MaxNumberOfCheckInsError());
  });

  it('should not to able make check to a gym that does not exist', async () => {
    //given
    const input = {
      userId: 'fake-id',
      gymId: 'fake-id',
      latitude: -23.5123115,
      longitude: -46.8349725,
    };

    //when//then
    await expect(() => sut.execute(input)).rejects.toThrow(new ResourceNotFoundError());
  });

  it('should not be able check in on distant gym', async () => {
    //given
    const gym = await gymsRepository.create({
      title: 'Nova Forma',
      description: 'treine o básico',
      phone: '55119966325589',
      latitude: -23.5043583,
      longitude: -46.8369255,
    });

    const input = {
      userId: 'fake-id',
      gymId: gym.id,
      latitude: -23.5123115,
      longitude: -46.8349725,
    };

    //when//then
    await expect(() => sut.execute(input)).rejects.toThrow(new MaxDistanceError());
  });
});

type Output = {
  id: string;
  title: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
}
