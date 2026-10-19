import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import { validate } from './config/env.validation';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: [join(process.cwd(), 'src/schema.gql')],
      playground: true,
    }),
    ProfileModule,
  ],
})
export class AppModule {}
