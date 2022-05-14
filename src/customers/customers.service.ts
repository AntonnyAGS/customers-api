import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '../cache/cache.service';
import { Customer } from './models/customer';
import { AddCustomerDTO } from './models/dto/add-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
  ) {}

  async add(addCustomerDTO: AddCustomerDTO): Promise<Customer> {
    const data = new Customer({ ...addCustomerDTO, id: randomUUID() });

    return data;
  }
}
