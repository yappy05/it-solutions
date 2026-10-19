import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: { skills: true; experiences: true; projects: true };
}>;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<ProfileWithRelations> {
    const profile = await this.prisma.profile.findFirst({
      include: { skills: true, experiences: true, projects: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }
}
