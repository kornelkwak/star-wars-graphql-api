import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { DatabaseService } from './database.service';
import { Film } from 'src/types/film.type';
import { Species } from 'src/types/species.type';
import { Vehicle } from 'src/types/vehicle.type';
import { Starship } from 'src/types/startship.type';
import { Planet } from 'src/types/planet.type';
import { WordCount } from 'src/types/wordCount.type';

@Resolver()
export class DatabaseResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query(() => [Film])
  async films() {
    return this.databaseService.fetchMultipleResources('films');
  }

  @Query(() => Film)
  async film(@Args('id') id: string) {
    return this.databaseService.fetchSingleResource('films', id);
  }

  @Query(() => [Species])
  async species() {
    return this.databaseService.fetchMultipleResources('species');
  }

  @Query(() => Species)
  async specie(@Args('id') id: string) {
    return this.databaseService.fetchSingleResource('species', id);
  }

  @Query(() => [Vehicle])
  async vehicles() {
    return this.databaseService.fetchMultipleResources('vehicles');
  }

  @Query(() => Vehicle)
  async vehicle(@Args('id') id: string) {
    return this.databaseService.fetchSingleResource('vehicles', id);
  }

  @Query(() => [Starship])
  async starships() {
    return this.databaseService.fetchMultipleResources('starships');
  }

  @Query(() => Starship)
  async starship(@Args('id') id: string) {
    return this.databaseService.fetchSingleResource('starships', id);
  }

  @Query(() => [Planet])
  async planets() {
    return this.databaseService.fetchMultipleResources('planets');
  }

  @Query(() => Planet)
  async planet(@Args('id') id: string) {
    return this.databaseService.fetchSingleResource('planets', id);
  }
}
