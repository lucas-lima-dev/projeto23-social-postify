import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { CreateUserService } from 'src/modules/users/useCases/create/create-user.service';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'Driven';
  private AUDIENCE = 'users';

  constructor(
    private readonly createUserService: CreateUserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(body: AuthSignUpDto) {
    const user = await this.createUserService.addUser(body);
    return this.createToken(user);
  }

  async signIn(body: AuthSignInDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: body.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const validPassword = bcrypt.compareSync(body.password, user.password);
    if (!validPassword) throw new UnauthorizedException('Invalid credentials');

    return this.createToken(user);
  }

  private async createToken(user: User) {
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

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIENCE,
        issuer: this.ISSUER,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
