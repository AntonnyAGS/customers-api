import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const httpService = {
    get: jest.fn(() => of({})),
  };

  beforeEach(async () => {
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

  it('should get from auth server', async () => {
    const result = await service.verifyToken('mockedtoken');

    expect(result).toBeDefined();
  });

  it('should call http service to make requests', async () => {
    await service.verifyToken('mockedtoken');

    expect(httpService.get).toHaveBeenCalled();
  });
});
