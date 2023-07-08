import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './database/prisma.module';
import { PublicationsModule } from './modules/publications/publications.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PrismaModule, PublicationsModule, AuthModule],
})
export class AppModule {}
