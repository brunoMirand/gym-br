import { CheckIn } from '@/domain/entities/check-in';
export interface CheckInsRepository {
  create(input: Input): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null >;
}

type Input = {
  userId: string,
  gymId: string,
}
