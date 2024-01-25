export type CheckIn = {
  id: string;
  validated_at?: Date | null;
  created_at: Date;
  user_id: string;
  gym_id: string;
}

export type InputCheckIn = {
  userId: string,
  gymId: string,
}
