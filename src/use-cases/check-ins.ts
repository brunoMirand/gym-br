import { CheckIn, InputCheckIn } from '@/domain/entities/check-in';
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository';
import { GymsRepository } from '@/repositories/interfaces/gyms-repository';
import { ResourceNotFoundError, MaxDistanceError, MaxNumberOfCheckInsError } from '@/use-cases/errors';
import { getDistanceBetweenCoordinates } from '@/domain/coordinate';

export class CheckIns {
  private readonly MAX_DISTANCE_IN_KILOMETERS = 0.1;

  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {
  }

  async execute(input: InputCheckIn): Promise<CheckIn> {
    const { userId, gymId, latitude, longitude } = input;
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude, longitude },
      { latitude: gym.latitude, longitude: gym.longitude },
    );
    if (distance > this.MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError();
    }

    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId
    });

    return checkIn;
  }
}
