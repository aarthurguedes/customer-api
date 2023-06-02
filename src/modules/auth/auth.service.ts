import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async isValidToken(
    token: string,
  ): Promise<{ is_valid: boolean; status: number; error?: string }> {
    try {
      const baseUrl = this.configService.get('SSO_URL');
      await firstValueFrom(
        this.httpService.get(
          `${baseUrl}/auth/realms/careers/protocol/openid-connect/userinfo`,
          { headers: { Authorization: `Bearer ${token}` } },
        ),
      );
      return { is_valid: true, status: 200 };
    } catch (error) {
      return {
        is_valid: false,
        status: error.response.status,
        error: error.response.data.error_description,
      };
    }
  }
}
