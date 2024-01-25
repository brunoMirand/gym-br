export type Gym = {
  id: string;
  title: string;
  description: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export type InputGym = Omit<Gym, 'id'>;
