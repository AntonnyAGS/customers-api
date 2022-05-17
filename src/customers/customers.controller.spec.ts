import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './models/customer';

describe('CustomersController', () => {
  let controller: CustomersController;
  const customersService = {
    add: jest.fn(() => Promise.resolve(new Customer())),
    getOne: jest.fn(() => Promise.resolve(new Customer())),
    update: jest.fn(() => Promise.resolve(new Customer())),
  };
  const authService = {
    verifyToken: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        { provide: CustomersService, useValue: customersService },
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service to add new customer', () => {
    controller.addCustomer({ document: 435, name: 'MockedCustomer' });

    expect(customersService.add).toHaveBeenCalled();
  });

  it('should call service to load customer', () => {
    controller.getCustomer('MockedId');

    expect(customersService.getOne).toHaveBeenCalled();
  });

  it('should call service to update customer', () => {
    controller.updateCustomer('MockedId', {
      document: 456,
      name: 'MockedName',
      id: 'MockedId',
    });

    expect(customersService.getOne).toHaveBeenCalled();
  });
});
