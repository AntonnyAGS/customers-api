import { IsNumber, IsString } from 'class-validator';

export class AddCustomerDTO {
  @IsNumber()
  readonly document: number;

  @IsString()
  readonly name: string;

  // constructor(init?: AddCustomerDTO) {
  //   this.id = init?.id;
  //   this.document = init?.document;
  //   this.name = init?.name;
  // }
}
