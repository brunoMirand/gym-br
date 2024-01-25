import { Gym, InputGym} from '@/domain/entities/gym';
import { GymsRepository } from '@/repositories/interfaces/gyms-repository';
import { CreateGymError } from '@/use-cases/errors';

export class CreateGym {
  constructor(private gymsRepository: GymsRepository) { }

  async execute(input: InputGym): Promise<Gym> {
    try {
      const gym = await this.gymsRepository.create(input);
      return gym;
    } catch (e) {
      throw new CreateGymError();
    }
  }
}
