import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository';

export class CheckIn {
  constructor(private checkInsRepository: CheckInsRepository) {
  }

  async execute(input: Input): Promise<Output> {
    const { userId, gymId } = input;
    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId
    });

    return checkIn;
  }
}

type Input = {
  userId: string,
  gymId: string,
}

type Output = {
  id: string;
  validated_at?: Date | null;
  created_at: Date;
  user_id: string;
  gym_id: string;
}