import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { AddCustomerDTO } from './models/dto/add-customer.dto';
import { Customer } from './models/customer';
import { UpdateCustomerDTO } from './models/dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // @Get()
  // async getCustomers(): Customer[] {}

  // @Get('/:id')
  // async getCustomer(@Param() id: string): Customer {}

  @Post()
  async addCustomer(@Body() addCustomerDTO: AddCustomerDTO): Promise<Customer> {
    return this.customersService.add(addCustomerDTO);
  }

  // @Put()
  // async updateCustomer(@Body() updateCustomerDTO: UpdateCustomerDTO): Customer {

  // }
}
