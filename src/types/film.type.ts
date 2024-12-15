import { ObjectType, Field } from '@nestjs/graphql';
import { WordCount } from './wordCount.type';

@ObjectType()
export class Film {
  @Field()
  title: string;

  @Field()
  opening_crawl: string;

  @Field()
  characters: string[];

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  release_date: string;

  @Field(() => [WordCount], { nullable: true })
  wordsCount?: WordCount[];

  @Field({ nullable: true })
  mostFrequentCharacter?: string;
}