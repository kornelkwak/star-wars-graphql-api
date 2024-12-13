import { Resolver, Query, Args } from '@nestjs/graphql';
import { PlanetService } from './planet.service';
import { Planet } from './planet.type';

@Resolver(() => Planet)
export class PlanetResolver {
  constructor(private readonly PlanetService: PlanetService) {}

  @Query(() => [Planet])
  planets() {
    return this.PlanetService.getPlanet();
  }

  @Query(() => Planet)
  planet(@Args('id') id: string) {
    return this.PlanetService.getPlanetById(id);
  }
}
