import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { lastValueFrom } from 'rxjs';
import { VerifyTokenDTO } from './models/dto/verify-token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async verifyToken(token: string): Promise<void> {
    try {
      const data = instanceToPlain(
        new VerifyTokenDTO({
          clientId: process.env.AUTH_CLIENT_ID,
          clientSecret: process.env.AUTH_CLIENT_SECRET,
          token,
        }),
      );

      const response = await lastValueFrom(
        this.httpService.post(process.env.AUTH_URI, new URLSearchParams(data), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );

      if (!response.data.active) {
        throw new UnauthorizedException();
      }
    } catch (err) {
      if (err.status === 401 || err instanceof UnauthorizedException) {
        throw new UnauthorizedException({
          message: 'Unauthorized',
          details: err,
        });
      }

      throw new BadGatewayException({
        message: 'Could not fetch SSO',
        details: err,
      });
    }
  }
}
