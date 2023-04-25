import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../material/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/material/user/dto/create-user.dto';

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
    async signIn2(
        authCredentialsDto: CreateUserDto,
      ): Promise<{ accessToken: string }> {
        const { loginName, password } = authCredentialsDto;
        const user = await this.usersService.findOneByLoginName(loginName);

    
        if (user && (await bcrypt.compare(password, user.password))) {

            const payload = { lastName: user.lastName, sub: user.id };

          const accessToken: string = await this.jwtService.sign(payload);
          return { accessToken };
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