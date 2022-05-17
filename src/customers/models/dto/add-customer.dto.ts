import { IsNumber, IsString } from 'class-validator';

export class AddCustomerDTO {
  @IsNumber()
  readonly document: number;

  @IsString()
  readonly name: string;
}
