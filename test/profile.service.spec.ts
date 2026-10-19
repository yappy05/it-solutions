import { describe, expect, it, vi } from 'vitest';
import { ProfileService } from '../src/profile/profile.service';
describe('ProfileService', () => {
  it('returns profile with relations', async () => {
    const profile = {
      id: 1,
      name: 'N',
      description: 'D',
      skills: [],
      experiences: [],
      projects: [],
    };
    const prisma = {
      profile: { findFirst: vi.fn().mockResolvedValue(profile) },
    } as never;
    await expect(new ProfileService(prisma).getProfile()).resolves.toEqual(profile);
  });
  it('throws when profile is missing', async () => {
    const prisma = {
      profile: { findFirst: vi.fn().mockResolvedValue(null) },
    } as never;
    await expect(new ProfileService(prisma).getProfile()).rejects.toThrow('Profile not found');
  });
});
