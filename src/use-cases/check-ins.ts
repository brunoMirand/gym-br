import { CheckIn, InputCheckIn } from '@/domain/entities/check-in';
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository';

export class CheckIns {
  constructor(private checkInsRepository: CheckInsRepository) {
  }

  async execute(input: InputCheckIn): Promise<CheckIn> {
    const { userId, gymId } = input;
    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId
    });

    return checkIn;
  }
}
