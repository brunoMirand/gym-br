import { CheckIn } from '@/domain/entities/check-in';
export interface CheckInsRepository {
  create(input: Input): Promise<CheckIn>
}

type Input = {
  userId: string,
  gymId: string,
}
