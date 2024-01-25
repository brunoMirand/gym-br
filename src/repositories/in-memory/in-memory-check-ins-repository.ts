import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { CheckIn, InputCheckIn } from '@/domain/entities/check-in';
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private items: CheckIn[] = [];

  async create(data: InputCheckIn) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.userId,
      validated_at: null,
      gym_id: data.gymId,
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.items.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOneSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOneSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }
}
