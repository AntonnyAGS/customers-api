import { IsNumber, IsString, IsUUID } from 'class-validator';

export class Customer {
  @IsUUID()
  readonly id: string;

  @IsNumber()
  readonly document: number;

  @IsString()
  readonly name: string;

  constructor(init?: Customer) {
    this.id = init?.id;
    this.document = init?.document;
    this.name = init?.name;
  }
}
