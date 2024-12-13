import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { FilmModule } from './film/film.module';
import { SpeciesModule } from './species/species.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { StarshipModule } from './starship/starship.module';
import { PlanetModule } from './planet/planet.module';

@Module({
  imports: [

    CacheModule.register({ ttl: 24 * 60 * 60 }), 
    
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    FilmModule,
    SpeciesModule,
    VehicleModule,
    StarshipModule,
    PlanetModule,
  ],
})
export class AppModule {}
