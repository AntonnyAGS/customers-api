import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async verifyToken(token: string): Promise<AxiosResponse<unknown>> {
    return lastValueFrom(
      this.httpService.get(process.env.AUTH_BASE_URI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );
  }
}
