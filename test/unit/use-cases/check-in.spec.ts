import { CheckIn } from '@/use-cases/check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckIn;

describe('Use Case - Create CheckIn', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckIn(checkInRepository);
  });

  it('should to able create check in', async () => {
    //given
    const input = {
      userId: 'fake-id',
      gymId: 'fake-id',
    };

    //when
    const result = await sut.execute(input);

    //then
    expect(result.id).toEqual(expect.any(String));
  });
});
