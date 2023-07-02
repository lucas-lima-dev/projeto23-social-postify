import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  users: CreateUserDto[] = [];

  create({ name, email, password, avatar }: CreateUserDto): void {
    const validateEmail = this.users.find((user) => user.email === email);
    if (validateEmail) {
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);
    }
    const user = new CreateUserDto(name, email, password, avatar);
    this.users.push(user);
  }

  findAll(): CreateUserDto[] {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
