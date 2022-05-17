import { Expose } from 'class-transformer';

export class VerifyTokenDTO {
  @Expose({ name: 'client_id' })
  readonly clientId: string;

  @Expose({ name: 'client_secret' })
  readonly clientSecret: string;

  readonly token: string;

  constructor(init?: VerifyTokenDTO) {
    this.clientId = init?.clientId;
    this.clientSecret = init?.clientSecret;
    this.token = init?.token;
  }
}
