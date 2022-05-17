import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateCustomerDTO {
  @IsUUID()
  readonly id: string;

  @IsNumber()
  readonly document: number;

  @IsString()
  readonly name: string;
}
