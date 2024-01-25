import { Gym, InputGym} from '@/domain/entities/gym';

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: InputGym): Promise<Gym>;
}
