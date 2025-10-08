import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy],
})
export class AuthModule {}
