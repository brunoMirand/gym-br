import { randomUUID } from 'node:crypto';
import { CheckIn, InputCheckIn } from '@/domain/entities/check-in';
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private checkIns: CheckIn[] = [];

  async create(data: InputCheckIn) {
    const checkIn: CheckIn = {
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
