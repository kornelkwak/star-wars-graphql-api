import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Film } from 'src/types/film.type';
import { WordCount } from 'src/types/wordCount.type';
import { DatabaseService } from './database.service';

@Resolver(() => Film)
export class FilmResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @ResolveField(() => [WordCount], { nullable: true })
  wordsCount(@Parent() film: Film) {
    return this.databaseService.countWords(film.opening_crawl);
  }

  @ResolveField(() => String, { nullable: true })
  mostFrequentCharacter(@Parent() film: Film) {
    return this.databaseService.findMostFrequentCharacter(film);
  }
}
