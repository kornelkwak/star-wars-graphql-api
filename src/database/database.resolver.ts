import { Resolver, Query, Args } from '@nestjs/graphql';
import { DatabaseService } from './database.service';
import { Film } from 'src/types/film.type';
import { Species } from 'src/types/species.type';
import { Vehicle } from 'src/types/vehicle.type';
import { Starship } from 'src/types/startship.type';
import { Planet } from 'src/types/planet.type';

@Resolver()
export class DatabaseResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Film])
  async films() {
    return this.databaseService.fetchAndCacheResource('films');
  }

  @Query(() => Film)
  async film(@Args('id') id: string) {
    return this.databaseService.fetchAndCacheResource('films', id);
  }

  @Query(() => [Species])
  async species() {
    return this.databaseService.fetchAndCacheResource('species');
  }

  @Query(() => Species)
  async specie(@Args('id') id: string) {
    return this.databaseService.fetchAndCacheResource('species', id);
  }

  @Query(() => [Vehicle])
  async vehicles() {
    return this.databaseService.fetchAndCacheResource('vehicles');
  }

  @Query(() => Vehicle)
  async vehicle(@Args('id') id: string) {
    return this.databaseService.fetchAndCacheResource('vehicles', id);
  }

  @Query(() => [Starship])
  async starships() {
    return this.databaseService.fetchAndCacheResource('starships');
  }

  @Query(() => Starship)
  async starship(@Args('id') id: string) {
    return this.databaseService.fetchAndCacheResource('starships', id);
  }

  @Query(() => [Planet])
  async planets() {
    return this.databaseService.fetchAndCacheResource('planets');
  }

  @Query(() => Planet)
  async planet(@Args('id') id: string) {
    return this.databaseService.fetchAndCacheResource('planets', id);
  }
}