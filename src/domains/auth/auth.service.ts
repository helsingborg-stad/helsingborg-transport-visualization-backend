import { AuthDTO } from './types';
import { IAuthRepo } from './types';
import { UserRepository } from '@root/repositories';
import { toAuthDTO } from './auth.dto';
import StatusError from '@root/utils/statusError';

export interface IAuthService {
  login(email: string, password: string): Promise<AuthDTO | null>;
  //   forgotPassword(email: string): Promise<void>;
  //   resetPassword(token: string, password: string): Promise<void>;
  //   getMe(id: number): Promise<AuthDTO>;
}

export class AuthService implements IAuthService {
  constructor(private authRepo: IAuthRepo = new UserRepository()) {}
  async login(email: string, password: string): Promise<AuthDTO> {
    const user = await this.authRepo.findByEmail(email);

    if (!user) {
      throw new StatusError(401, 'Invalid login');
    }

    const isPasswordValid = await user.isPasswordValid(password);

    if (!isPasswordValid) {
      throw new StatusError(401, 'Invalid login');
    }
    return toAuthDTO(user);
  }
}
