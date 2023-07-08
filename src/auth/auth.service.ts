import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { CreateUserService } from 'src/modules/users/useCases/create/create-user.service';
import * as bcrypt from 'bcrypt';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'Driven';
  private AUDIENCE = 'users';

  constructor(
    private readonly usersService: CreateUserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: AuthSignUpDto): Promise<{ token: string }> {
    const user = await this.usersService.addUser(body);
    return this.createToken(user);
  }

  async signIn(body: AuthSignInDto) {
    const user = await this.userRepository.findByEmail(body.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const validPassword = bcrypt.compareSync(body.password, user.password);
    if (!validPassword) throw new UnauthorizedException('Invalid credentials');

    return this.createToken(user);
  }

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return { token };
  }
}
