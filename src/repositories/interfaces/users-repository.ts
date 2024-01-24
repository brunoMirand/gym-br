export interface UsersRepository {
  findByEmail(email: string): Promise<Output | null>;
  create(data: Input): Promise<Output>;
  findById(id: string): Promise<Output | null>;
}

type Input = {
  name: string
  email: string
  password_hash: string
};

type Output = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};
