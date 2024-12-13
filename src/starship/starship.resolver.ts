import { Resolver, Query, Args } from '@nestjs/graphql';
import { StarshipService } from './starship.service';
import { Starship } from './startship.type';

@Resolver(() => Starship)
export class StarshipResolver {
  constructor(private readonly StarshipService: StarshipService) {}

  @Query(() => [Starship])
  starships() {
    return this.StarshipService.getStarship();
  }

  @Query(() => Starship)
  starship(@Args('id') id: string) {
    return this.StarshipService.getStarshipById(id);
  }
}
