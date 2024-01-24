export interface CheckInsRepository {
  create(input: Input): Promise<Output>
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