import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { DatabaseResolver } from './database.resolver';
import { Database, DatabaseSchema } from './database.schema';

@Module({

  imports: [
    MongooseModule.forFeature([{name: Database.name, schema: DatabaseSchema}]),
  ],
  providers: [DatabaseService, DatabaseResolver]
})
export class DatabaseModule {}
