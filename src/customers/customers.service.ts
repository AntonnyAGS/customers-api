import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { RedisService } from '../redis/redis.service';
import { Customer } from './models/customer';
import { AddCustomerDTO } from './models/dto/add-customer.dto';
import { UpdateCustomerDTO } from './models/dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly cacheService: RedisService) {}

  async getOne(id: string): Promise<Customer> {
    const data = await this.cacheService.get('customer', id, {
      dataType: Customer,
    });

    if (!data) {
      throw new NotFoundException({
        message: `Cannot found an customer with id: ${id}`,
      });
    }

    return data;
  }

  async add(addCustomerDTO: AddCustomerDTO): Promise<Customer> {
    const data = new Customer({ ...addCustomerDTO, id: randomUUID() });

    await this.cacheService.add('customer', data.id, data);

    return data;
  }

  async update({
    id,
    ...updateCustomerDTO
  }: UpdateCustomerDTO): Promise<Customer> {
    await this.getOne(id);

    await this.cacheService.delete('customer', id);

    const data = new Customer({ ...updateCustomerDTO, id });
    await this.cacheService.add('customer', id, data);

    return data;
  }
}
