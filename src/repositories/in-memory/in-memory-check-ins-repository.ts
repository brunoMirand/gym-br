import { randomUUID } from 'node:crypto';
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private checkIns: Output[] = [];

  async create(data: Input) {
    const checkIn: Output = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.userId,
      validated_at: null,
      gym_id: data.gymId,
    };

    this.checkIns.push(checkIn);

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
