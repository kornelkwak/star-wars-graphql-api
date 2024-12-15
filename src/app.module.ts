import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Wczytuje zmienne z pliku .env

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL), // Odczytaj URL z .env
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
