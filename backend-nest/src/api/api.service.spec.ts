import { Test, TestingModule } from '@nestjs/testing';
import { ApiService } from './api.service';
import { HttpService } from '@nestjs/axios';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            // add other methods as needed
          },
        },
      ],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
