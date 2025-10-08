import { User } from 'src/models';
import { Response } from 'src/shared/interface';

export class ProfileResponseDto implements Response {
  user: Partial<User>;
  message: string;
}
