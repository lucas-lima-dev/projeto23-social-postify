import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User>;
  abstract update(id: number, data: CreateUserDto): Promise<void>;
  abstract findByEmail(email: string): Promise<User>;
}
