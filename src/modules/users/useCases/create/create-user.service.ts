import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDto): Promise<void> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const userAlreadyExists: User = await this.userRepository.findByEmail(
      data.email,
    );
    if (userAlreadyExists) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    await this.userRepository.create({
      ...data,
      password: passwordHash,
    });
  }
}
