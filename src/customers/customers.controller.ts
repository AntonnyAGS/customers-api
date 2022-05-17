import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { AddCustomerDTO } from './models/dto/add-customer.dto';
import { Customer } from './models/customer';
import { UpdateCustomerDTO } from './models/dto/update-customer.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getCustomer(@Param('id') id: string): Promise<Customer> {
    return this.customersService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async addCustomer(@Body() addCustomerDTO: AddCustomerDTO): Promise<Customer> {
    return this.customersService.add(addCustomerDTO);
  }

  // Why should receive id at body if already received in param?
  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDTO: UpdateCustomerDTO,
  ): Promise<Customer> {
    return this.customersService.update({ ...updateCustomerDTO, id });
  }
}
