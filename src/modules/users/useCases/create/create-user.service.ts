import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async addUser(body: CreateUserDto) {
    const passwordHash = await bcrypt.hash(body.password, 10);
    const userAlreadyExists: User = await this.userRepository.findByEmail(
      body.email,
    );
    if (userAlreadyExists) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }

    return await this.userRepository.addUser({
      ...body,
      password: passwordHash,
    });
  }
}
