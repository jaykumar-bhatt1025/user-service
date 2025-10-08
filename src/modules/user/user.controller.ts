import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ProfileResponseDto } from './dto/profile.dto';
import { AuthUser } from 'src/shared/decorators';
import { RequestUser } from 'src/shared/types';

@Controller({ version: '1' })
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  @UseGuards(JwtGuard)
  async getProfile(@AuthUser() user: RequestUser): Promise<ProfileResponseDto> {
    const userResponse = await this.userService.findById(user.id);
    return {
      user: {
        first_name: userResponse.first_name,
        last_name: userResponse.last_name,
        email: userResponse.email,
        id: userResponse.id,
        uuid: userResponse.uuid,
        created_at: userResponse.created_at,
        profile_photo: userResponse.profile_photo,
      },
      message: 'User profile fetched successfully.',
    };
  }
}
