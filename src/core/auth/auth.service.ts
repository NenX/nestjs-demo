import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../material/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/material/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private jwtService: JwtService) { }

  async validateUser(loginName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLoginName(loginName);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async signIn2(loginName: string, pass: string) {
    const user = await this.usersService.findOneByLoginName(loginName);

    const t = await bcrypt.compare(pass, user.password)
    console.log('signIn2', user, t)
    if (user && t) {

      const payload = { lastName: user.lastName, sub: user.id };

      const access_token: string = await this.jwtService.sign(payload);



      const { password, ...result } = user;
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return {
        access_token,
        result
      };



    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  async signIn(loginName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLoginName(loginName);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { lastName: user.lastName, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      result
    };
  }
}