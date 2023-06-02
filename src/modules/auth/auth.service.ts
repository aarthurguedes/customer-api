import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async isValidToken(token: string): Promise<boolean> {
    try {
      const baseUrl = this.configService.get('SSO_URL');
      await firstValueFrom(
        this.httpService.get(
          `${baseUrl}/auth/realms/careers/protocol/openid-connect/userinfo`,
          { headers: { Authorization: `Bearer ${token}` } },
        ),
      );
      return true;
    } catch (error) {
      if (error.response?.status === 401)
        throw new UnauthorizedException(error.response.data.error_description);
      throw new BadGatewayException('SSO Unavailable');
    }
  }
}
