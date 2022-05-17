import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

type MockedHttpService = {
  post: any;
};

describe('AuthService', () => {
  let service: AuthService;
  let httpService: MockedHttpService;

  beforeEach(async () => {
    httpService = {
      post: jest.fn(() => of(Promise.resolve({ data: { active: true } }))),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpService,
          useValue: httpService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw unauthorized exception if token is not active', async () => {
    httpService.post.mockReturnValue(
      of(Promise.resolve({ data: { active: false } })),
    );

    const result = service.verifyToken('mockedtoken');

    expect(result).rejects.toThrowError(
      new UnauthorizedException('Unauthorized'),
    );
  });

  it('should throw unauthorized exception if servers throws 401', async () => {
    httpService.post.mockReturnValue(
      of(Promise.reject(new HttpException('Unauthenticated', 401))),
    );

    const result = service.verifyToken('mockedtoken');

    expect(result).rejects.toThrowError(
      new UnauthorizedException('Unauthorized'),
    );
  });

  it('should throw bad gateway exception if server throws error', async () => {
    httpService.post.mockReturnValue(
      of(Promise.reject(new BadRequestException())),
    );

    const result = service.verifyToken('mockedtoken');

    expect(result).rejects.toThrowError(
      new BadGatewayException('Could not fetch SSO'),
    );
  });

  it('should get from auth server', async () => {
    const result = await service.verifyToken('mockedtoken');

    expect(result).toBe(undefined);
  });

  it('should call http service to make requests', async () => {
    await service.verifyToken('mockedtoken');

    expect(httpService.post).toHaveBeenCalled();
  });
});
