import { Resolver, Query, Args } from '@nestjs/graphql';
import { SpeciesService } from './species.service';
import { Species } from './species.type';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private readonly SpeciesService: SpeciesService) {}

  @Query(() => [Species])
  species() {
    return this.SpeciesService.getSpecies();
  }

  @Query(() => Species)
  specie(@Args('id') id: string) {
    return this.SpeciesService.getSpeciesById(id);
  }
}
