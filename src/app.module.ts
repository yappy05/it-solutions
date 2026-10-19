import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProfileModule } from './profile/profile.module';
import { validate } from './config/env.validation';

const typeDefs = `
type Profile { id: Int! name: String! description: String! githubUrl: String skills: [Skill!]! experiences: [Experience!]! projects: [Project!]! }
type Skill { id: Int! name: String! }
type Experience { id: Int! company: String! position: String! period: String! achievements: String! }
type Project { id: Int! name: String! url: String! }
type Query { profile: Profile! }
`;

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typeDefs,
      playground: true,
    }),
    ProfileModule,
  ],
})
export class AppModule {}
