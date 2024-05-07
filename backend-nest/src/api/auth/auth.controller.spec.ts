import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            // add other methods as needed
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            // add other methods as needed
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should call AuthService signIn with correct parameters', async () => {
      const signInDto = { email: 'test@example.com', password: 'password' };
      await controller.signIn(signInDto);
      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.email,
        signInDto.password,
      );
    });
  });

  describe('getProfile', () => {
    it('should return the user from the request', () => {
      const req = {
        user: { id: 19, email: 'test@example.com', password: 'password' },
      };
      const result = controller.getProfile(req);
      expect(result).toEqual(req.user);
    });
  });
});
