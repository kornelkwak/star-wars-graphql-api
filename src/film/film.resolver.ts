import { Resolver, Query, Args } from '@nestjs/graphql';
import { FilmService } from './film.service';
import { Film } from './film.type';

@Resolver(() => Film)
export class FilmResolver {
  constructor(private readonly filmService: FilmService) {}

  @Query(() => [Film])
  films() {
    return this.filmService.getFilms();
  }

  @Query(() => Film)
  film(@Args('id') id: string) {
    return this.filmService.getFilmById(id);
  }
}
