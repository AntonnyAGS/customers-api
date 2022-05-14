import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { Customer } from './models/customer';

describe('CustomersController', () => {
  let controller: CustomersController;
  const customersService = {
    add: jest.fn(() => Promise.resolve(new Customer())),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: CustomersService, useValue: customersService }],
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
});
