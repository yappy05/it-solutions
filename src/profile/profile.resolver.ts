import { Query, Resolver } from '@nestjs/graphql';
import { ProfileService, ProfileWithRelations } from './profile.service';

@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly service: ProfileService) {}

  @Query('profile')
  profile(): Promise<ProfileWithRelations> {
    return this.service.getProfile();
  }
}
