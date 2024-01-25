import { randomUUID } from 'node:crypto';
import { Gym, InputGym } from '@/domain/entities/gym';
import { GymsRepository } from '@/repositories/interfaces/gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  private items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find(gym => gym.id === id);
    if (!gym) {
      return null;
    }

    return gym;
  }

  async create(data: InputGym) {
    if (data.title.length < 3) {
      throw new Error('Unable to create gym');
    }

    const gym: Gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    this.items.push(gym);

    return gym;
  }
}
